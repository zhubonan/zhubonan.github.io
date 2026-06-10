---
layout: page
title: Gallery
permalink: /gallery/
description: Group photos and activity snapshots
nav: true
nav_order: 8
images:
  lightbox2: true
  photoswipe: true
---

Group activity photos and memorable moments.

To add photos from an event, please submit a pull request following the [instructions](#how-to-add-photos) at the bottom.

---

{% for event in site.data.gallery %}
### {{ event.title }}

<div class="row">
    {% for photo in event.photos %}
    <div class="col-sm-6 col-md-4 mt-3 mt-md-0">
        <a href="{{ photo.full }}" data-lightbox="{{ event.id }}" data-title="{{ photo.caption }}">
            <img src="{{ photo.thumb }}" alt="{{ photo.caption }}" class="img-fluid rounded z-depth-1" loading="lazy">
        </a>
    </div>
    {% endfor %}
</div>
{% endfor %}

---

## How to Add Photos

1. **Fork** this repository
2. Place photos under `assets/img/gallery/event-name/`
3. **Update** `_data/gallery.yml` with a new event entry:

```yaml
- id: event-name
  title: "Event Title"
  date: YYYY-MM-DD
  photos:
    - full: /assets/img/gallery/event-name/photo1.jpg
      thumb: /assets/img/gallery/event-name/photo1.jpg
      caption: "A short description"
```

4. Submit a **Pull Request**

> 💡 Tip: Resize photos to ~1200px wide before adding for best performance.
