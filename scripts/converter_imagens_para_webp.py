#!/usr/bin/env python3
"""Converte imagens de src/content para WebP.

Por padrao, apenas mostra o que seria feito. Use --apply para executar.
A conversao substitui o arquivo original pelo arquivo .webp. Use
--keep-originals para manter os arquivos de origem depois da conversao.
A conversao exige Pillow:
python3 -m pip install Pillow
"""

from __future__ import annotations

import argparse
import os
import tempfile
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    Image = None
    ImageOps = None


IMAGE_EXTENSIONS = {'.avif', '.jpeg', '.jpg', '.png', '.webp'}


def find_images(content_dir: Path) -> list[Path]:
    return sorted(
        image
        for image in content_dir.rglob('*')
        if image.is_file() and image.suffix.lower() in IMAGE_EXTENSIONS
    )


def webp_destination(source: Path) -> Path:
    return source.with_suffix('.webp')


def convert_image(source: Path, destination: Path, quality: int) -> None:
    if Image is None or ImageOps is None:
        raise RuntimeError(
            'Pillow nao esta instalado. Execute: python3 -m pip install Pillow'
        )

    with Image.open(source) as opened_image:
        image = ImageOps.exif_transpose(opened_image)
        if image.mode not in ('RGB', 'RGBA'):
            image = image.convert('RGBA' if 'A' in image.getbands() else 'RGB')

        with tempfile.NamedTemporaryFile(
            dir=destination.parent,
            prefix=f'.{destination.stem}.',
            suffix='.tmp',
            delete=False,
        ) as temporary_file:
            temporary_path = Path(temporary_file.name)

        try:
            image.save(temporary_path, 'WEBP', quality=quality, method=6)
            os.replace(temporary_path, destination)
        finally:
            temporary_path.unlink(missing_ok=True)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        '--apply',
        action='store_true',
        help='executa a conversao; sem esta opcao, apenas simula',
    )
    parser.add_argument(
        '--keep-originals',
        action='store_true',
        help='mantem JPEG, PNG e AVIF depois de criar o WebP',
    )
    parser.add_argument(
        '--quality',
        type=int,
        default=80,
        help='qualidade WebP entre 1 e 100 (padrao: 80)',
    )
    args = parser.parse_args()

    if not 1 <= args.quality <= 100:
        parser.error('--quality deve estar entre 1 e 100')

    root = Path(__file__).resolve().parents[1]
    content_dir = root / 'src' / 'content'
    images = find_images(content_dir)

    destinations: dict[Path, list[Path]] = {}
    for source in images:
        destinations.setdefault(webp_destination(source), []).append(source)

    collisions = {
        destination: sources
        for destination, sources in destinations.items()
        if len(sources) > 1
    }
    if collisions:
        for destination, sources in collisions.items():
            print(f'Conflito: varios arquivos geram {destination.relative_to(root)}')
            for source in sources:
                print(f'  - {source.relative_to(root)}')
        return 1

    print('Modo:', 'APLICAR' if args.apply else 'SIMULACAO')
    print('Qualidade WebP:', args.quality)
    print('Manter originais:', 'sim' if args.keep_originals else 'nao')

    for source in images:
        destination = webp_destination(source)
        print(f'  {source.relative_to(root)} -> {destination.relative_to(root)}')

        if not args.apply:
            continue

        convert_image(source, destination, args.quality)
        if not args.keep_originals and source != destination:
            source.unlink()

    print(f'Imagens encontradas: {len(images)}')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
