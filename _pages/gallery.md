---
layout: page
title: Gallery
permalink: /gallery/
description: Photos of the group
nav: true
nav_order: 8
images:
  lightbox2: true
  photoswipe: true
---

Group photos and activity snapshots.

To add your photos, please submit a pull request following the [instructions](#how-to-add-photos) at the bottom of this page.

---

## Group Photos

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/gallery/group/placeholder.jpg" title="Group photo" class="img-fluid rounded z-depth-1" %}
    </div>
</div>

---

## Members

{% for member in site.data.gallery %}
### {{ member.name }}

<div class="row">
    {% for photo in member.photos %}
    <div class="col-sm-6 col-md-4 mt-3 mt-md-0">
        <a href="{{ photo.full }}" data-lightbox="{{ member.id }}" data-title="{{ photo.caption }}">
            <img src="{{ photo.thumb }}" alt="{{ photo.caption }}" class="img-fluid rounded z-depth-1" loading="lazy">
        </a>
    </div>
    {% endfor %}
</div>
{% endfor %}

---

## How to Add Photos

1. **Fork** this repository
2. Create a folder under `assets/img/gallery/your-name/`
3. Add your photos (`.jpg`, `.png`, or `.webp`)
4. **Update** `_data/gallery.yml` with your entries:

```yaml
- id: your-name
  name: Your Name
  photos:
    - full: /assets/img/gallery/your-name/photo1.jpg
      thumb: /assets/img/gallery/your-name/photo1.jpg
      caption: "A short description"
```

5. Submit a **Pull Request** back to the main repository

> 💡 Tip: For best performance, resize your photos to ~1200px wide before adding.
