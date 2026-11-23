# Scheduled insights

Articles in this folder are not public. GitHub Pages leaves out folders whose names start with an underscore.

Each subfolder is named with the date the article should go live, for example `2026-12-01`. Every morning at about 06:15 (UK time in winter), the workflow "Publish scheduled insights" publishes any folder dated today or earlier. It:

- copies the article in `insights/` into the site;
- adds `index-row.html` to the top of the Insights page;
- adds `rss-item.xml` to the top of the RSS feed;
- adds `sitemap-url.xml` to the sitemap;
- deletes the folder, commits, asks GitHub Pages to rebuild, and tells Bing about the new page.

## Adding an article

1. Create a folder named with the go-live date.
2. Put the finished article in `insights/<slug>.html`. Show the month only, for example `<time datetime="2027-01">January 2027</time>`.
3. Add the three fragment files, copying the format of an existing folder.

## Moving a date

Rename the folder. Then update the `<lastmod>` date in `sitemap-url.xml` and the `<pubDate>` in `rss-item.xml`, and the `datePublished` and `dateModified` in the article's structured data.

## Publishing early

Open the Actions tab, choose "Publish scheduled insights" and click "Run workflow". This still only publishes folders whose date has arrived, so rename the folder to today's date first.

## Note

If the repository is public, anyone browsing it on GitHub can read these articles before their date. They are not on adjona.com until published.
