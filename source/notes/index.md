---
layout: wiki
wiki: Notes
menu_id: notes
breadcrumb: false
---
{% banner 随记 bg:/assets/banner/notes.jpg %}
{% navbar active:/notes/ [随记](/notes/)  %}
{% endbanner %}

{% timeline api:https://api.github.com/repos/xlenco/blog-timeline/issues?direction=asc %}{% endtimeline %}
