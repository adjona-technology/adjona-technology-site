"""Publish scheduled insight articles whose date has arrived.

Each folder _scheduled/YYYY-MM-DD/ holds:
  insights/<slug>.html   the finished article (copied to the site as it is)
  index-row.html         the row added to the top of insights.html
  rss-item.xml           the item added to the top of rss.xml
  sitemap-url.xml        the entry added to the end of sitemap.xml

Folders dated today or earlier (UK date) are published in date order and then
removed. The shared files are edited in place, so other changes made to them
in the meantime are kept.

Usage: python3 .github/scripts/publish_scheduled.py [YYYY-MM-DD]
The optional date is for testing ("publish as if today were ...").
"""
import datetime as dt
import os
import pathlib
import re
import shutil
import sys
from zoneinfo import ZoneInfo

ROOT = pathlib.Path(__file__).resolve().parents[2]
SCHEDULED = ROOT / "_scheduled"
FRAGMENTS = {"index-row.html", "rss-item.xml", "sitemap-url.xml", "README.md"}


def insert_once(path, fragment, marker, key, before=True):
    """Insert fragment next to the first marker, unless key is already there."""
    text = path.read_text(encoding="utf-8")
    if key in text:
        print(f"  {path.name}: already lists {key}, left as it is")
        return
    i = text.find(marker)
    if i < 0:
        sys.exit(f"Could not find {marker!r} in {path.name}")
    fragment = fragment.strip()
    if before:
        indent = re.search(r"[ \t]*$", text[:i]).group(0)
        text = text[:i] + fragment + "\n\n" + indent + text[i:]
    else:
        text = text[:i] + "  " + fragment + "\n" + text[i:]
    path.write_text(text, encoding="utf-8")
    print(f"  {path.name}: added {key}")


def main():
    today = dt.date.fromisoformat(sys.argv[1]) if len(sys.argv) > 1 else dt.datetime.now(ZoneInfo("Europe/London")).date()
    due = sorted(p for p in SCHEDULED.glob("????-??-??") if p.is_dir() and dt.date.fromisoformat(p.name) <= today)
    urls, dates = [], []
    for folder in due:
        print(f"Publishing {folder.name}")
        for f in sorted(folder.rglob("*")):
            if f.is_dir() or f.name in FRAGMENTS and f.parent == folder:
                continue
            rel = f.relative_to(folder)
            target = ROOT / rel
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(f, target)
            print(f"  copied {rel}")
            if f.suffix == ".html":
                urls.append(f"https://adjona.com/{rel.as_posix()}")
        row = (folder / "index-row.html").read_text(encoding="utf-8")
        href = re.search(r'href="([^"]+)"', row).group(1)
        insert_once(ROOT / "insights.html", row, '<a class="ins-row"', f'href="{href}"')
        item = (folder / "rss-item.xml").read_text(encoding="utf-8")
        link = re.search(r"<link>([^<]+)</link>", item).group(1)
        insert_once(ROOT / "rss.xml", item, "<item>", f"<link>{link}</link>")
        url = (folder / "sitemap-url.xml").read_text(encoding="utf-8")
        loc = re.search(r"<loc>([^<]+)</loc>", url).group(1)
        insert_once(ROOT / "sitemap.xml", url, "</urlset>", f"<loc>{loc}</loc>", before=False)
        shutil.rmtree(folder)
        dates.append(folder.name)
    if not due:
        print(f"Nothing due on or before {today}")
    if dates:
        urls.append("https://adjona.com/insights.html")
    out = os.environ.get("GITHUB_OUTPUT")
    if out:
        with open(out, "a", encoding="utf-8") as fh:
            fh.write(f"count={len(dates)}\n")
            fh.write(f"dates={', '.join(dates)}\n")
            fh.write(f"urls={' '.join(urls)}\n")


if __name__ == "__main__":
    main()
