#!/usr/bin/env python3
"""Migra artigos e imagens para src/content usando somente WebP.

Por padrao, apenas mostra o que seria feito. Use --apply para executar.
Sem --move, os arquivos originais sao preservados em public/ e os artigos
originais tambem permanecem no lugar. A conversao exige Pillow:
python3 -m pip install Pillow
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    Image = None


IMAGE_EXTENSIONS = {'.avif', '.jpeg', '.jpg', '.png', '.webp'}
MARKDOWN_IMAGE_RE = re.compile(
    r'(?P<prefix>!\[[^\]]*\]\()/(?P<niche>[^/]+)/(?P<slug>[^/]+)/(?P<name>[^)\s]+)(?P<suffix>\))'
)


def article_sources(root: Path) -> list[tuple[Path, Path]]:
    sources = []
    content_dir = root / 'src' / 'content'

    for niche_dir in sorted(content_dir.iterdir()):
        if not niche_dir.is_dir():
            continue

        for markdown_file in sorted(niche_dir.glob('*.md')):
            sources.append((markdown_file, niche_dir / markdown_file.stem))

    return sources


def image_sources(root: Path, niche: str, slug: str) -> list[Path]:
    source_dir = root / 'public' / niche / slug
    if not source_dir.is_dir():
        return []

    return [
        source
        for source in sorted(source_dir.iterdir())
        if source.is_file() and source.suffix.lower() in IMAGE_EXTENSIONS
    ]


def destination_name(source: Path) -> str:
    return f'{source.stem}.webp'


def rewrite_markdown(markdown: str) -> str:
    def replace(match: re.Match[str]) -> str:
        name = Path(match.group('name')).name
        replacement_name = f'{Path(name).stem}.webp'
        return f'{match.group("prefix")}./{replacement_name}{match.group("suffix")}'

    return MARKDOWN_IMAGE_RE.sub(replace, markdown)


def convert_image(source: Path, destination: Path) -> None:
    if Image is None:
        raise RuntimeError(
            'Pillow nao esta instalado. Execute: python3 -m pip install Pillow'
        )

    with Image.open(source) as image:
        if image.mode not in ('RGB', 'RGBA'):
            image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')
        image.save(destination, 'WEBP', quality=80, method=6)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        '--apply',
        action='store_true',
        help='executa a migracao; sem esta opcao, apenas simula',
    )
    parser.add_argument(
        '--move',
        action='store_true',
        help='move os arquivos; por padrao, copia e preserva public/',
    )
    args = parser.parse_args()

    root = Path(__file__).resolve().parents[1]
    public_dir = root / 'public'
    print('Modo:', 'APLICAR' if args.apply else 'SIMULACAO')
    print('Operacao:', 'mover' if args.move else 'copiar')
    print('Formato de destino: WebP (qualidade 80)')

    articles = article_sources(root)
    for markdown_file, destination_dir in articles:
        niche = markdown_file.parent.name
        slug = markdown_file.stem
        sources = image_sources(root, niche, slug)
        destination_markdown = destination_dir / 'index.md'

        print(f'  {markdown_file.relative_to(root)} -> {destination_markdown.relative_to(root)}')
        for source in sources:
            destination = destination_dir / destination_name(source)
            print(f'  {source.relative_to(root)} -> {destination.relative_to(root)}')

        if not args.apply:
            continue

        destination_dir.mkdir(parents=True, exist_ok=True)
        markdown = markdown_file.read_text(encoding='utf-8')
        destination_markdown.write_text(rewrite_markdown(markdown), encoding='utf-8')

        for source in sources:
            convert_image(source, destination_dir / destination_name(source))

        if args.move:
            markdown_file.unlink()
            for source in sources:
                source.unlink()

    print(f'Artigos encontrados: {len(articles)}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())