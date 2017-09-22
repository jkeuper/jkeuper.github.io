---
layout: inner
title: Contact
permalink: /contact/
lead_text: 'Please send me any comments, questions or just drop me a message!'
---

<div class="col-sm-4">
<h2>My contact details</h2>
<hr>
<span class="fa-stack">
<i class="fa fa-square fa-stack-2x"></i>
<i class="fa fa-user fa-stack-1x fa-inverse"></i>
</span>
Jasper Keuper<br />
<span class="fa-stack">
<i class="fa fa-square fa-stack-2x"></i>
<i class="fa fa-stack-1x fa-envelope fa-inverse" aria-hidden="true"></i>
</span>
<a href="mailto:jasper@keuperict.nl">jasper@keuperict.nl</a><br />
<span class="fa-stack">
<i class="fa fa-square fa-stack-2x"></i>
<i class="fa fa-stack-1x fa-phone fa-inverse" aria-hidden="true"></i>
</span>
+316 28 25 79 54<br />
<span class="fa-stack">
<i class="fa fa-square fa-stack-2x"></i>
<i class="fa fa-stack-1x fa-globe fa-inverse" aria-hidden="true"></i>
</span>
<a href="{{ site.url }}">keuperict.nl</a><br />
</div>

<div class="col-sm-8">
<h2>Or send me a message</h2>
<hr>
<form action="https://formspree.io/jasper@keuperict.nl" method="POST">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" name="name" required>
  </div>
  <div class="form-group">
    <label for="_replyto">Email</label>
    <input type="text" class="form-control" id="_replyto" name="_replyto" required>
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea class="form-control" type="textarea" id="message" name="message" rows="7"></textarea>
    <input type="hidden" name="_next" value="{{ site.url }}/thanks/" /> 
  </div>
  <button type="submit" class="btn btn-primary">Send message</button>
</form>
</div>

