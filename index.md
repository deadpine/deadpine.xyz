---
layout: default
title: deadpine.xyz
permalink: /
---

<section id="about">
	<h1>Deadpine</h1>
	<p>I'm a designer working at the intersection of product design and brand identity. Since 2017 I’ve been working in the crypto space. I was the lead designer at <a href="https://openzeppelin.com/" target="_blank">OpenZeppelin</a> and worked with projects like <a href="https://flashbots.net/" target="_blank">Flashbots</a>, <a href="http://ethlatam.org/" target="_blank">ETHLatam</a>, <a href="https://decentraland.org/" target="_blank">Decentraland</a>, <a href="https://app.rewilder.xyz/#" target="_blank">Rewilder</a> and <a href="https://mint.ethernautdao.io/#about" target="_blank">Ethernaut DAO</a>.</p>
	<p>Aside from a background in UI and branding I have experience in frontend, HTML, CSS, React and Svelte.</p>
	<p>Nowadays I am working as a freelancer and open for new projects.</p>
</section>

<section id="work">
	<h1>Work</h1>

	{% for post in site.posts %}
	<div class="project">
		<!-- <a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a> -->
		<div class="info">
			<a class="link">{{ post.title }}</a>
			<p class="tags">{{ post.tags }}</p>
			<p class="date">{{ post.date | date: "%Y" }}</p>
		</div>

		<div class="cover">
			<img class="cover-img" src="{{ post.image }}" />
		</div>
	</div>
	{% endfor %}
	<div class="images-bg"></div>
</section>

<section id="contact">
	<h2>hey<span>@deadpine.xyz</span></h2>
	<p><a href="https://twitter.com/deadpine_xyz" target="_blank">✦ twitter</a></p>
	<p><a href="https://github.com/deadpine" target="_blank">✦ github</a></p>
	<p><a href="https://goodreads.com/deadpine" target="_blank">✦ goodreads</a></p>
	<p><a href="https://www.behance.net/deadpine" target="_blank">✦ behance</a></p>
	<p><a href="https://dribbble.com/deadpine" target="_blank">✦ dribbble</a></p>
</section>