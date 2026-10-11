---
layout: layout
title: "Home"
permalink: /
color: var(--red)
sidebar: true
banner: true
number: 0
---


<style>.winbox{border:4px solid {{color}};background:var(--light)}::selection{background-color:{{color}}} a::selection{color:var(--light)}a{color:{{color}}}::-webkit-scrollbar-thumb:hover {background:{{color}}}.wb-header{background:{{color}}}.text-red::selection{color:var(--light)}.tippy-box[data-theme~='dorian'] {border:2px solid {{color}}}.tippy-box[data-theme~='dorian'][data-placement^='top'] > .tippy-arrow::before {border-top-color: {{color}}; top:16px;}.tippy-box[data-theme~='dorian'][data-placement^='bottom'] > .tippy-arrow::before {border-bottom-color: {{color}};}.tippy-box[data-theme~='dorian'][data-placement^='left'] > .tippy-arrow::before {border-left-color: {{color}};}.tippy-box[data-theme~='dorian'][data-placement^='right'] > .tippy-arrow::before {border-right-color: {{color}};}h1{text-decoration:underline {{color}}}hr{border-color:{{color}}}hr::after{color:{{color}}}</style>


# Welcome to my website!
---
Hiya there, welcome to my webbed site! I'm Dorian, and I like to do and make things. I
upload said things I do or make here. If anything is broken, hard refresh (Ctrl + Shift + R). It's a work in progress, so please don't expect much to be done.

Site was made with [11ty](https://11ty.dev) and coded with [VSCodium](https://vscodium.org) on my
[Kubuntu](https://kubuntu.org) system. Website is hosted via [Github Pages](https://docs.github.com/en/pages). Please excuse any __errors__ you may find (especially on devices with smaller viewports), I am working on it. 

My site also has some keybinds. You can **toggle the sidebar with ``/``** and **navigate through the main pages with ``1-7``**. You can still use regular tab and enter too!
## What's new?
---
<div class="flex flex-col gap-2">
    <div class="flex-row flex" style="gap:.5em">
        <article class="w-50 flex-col p-2 text-light" style="background:{{color}};">
            <h3 class="text-light">Latest status<h3>
                    <div class="bg-light p-4 flex flex-col justify-center items-center" id="status" style="padding:1rem 1.2rem;padding-bottom:.8rem;">
                                        <div class="relative" style="z-index:99">
                        <ws-widget type="status" iid="6315" class="pt-4"></ws-widget>
                    </div></div>
        </article>
        <article class="w-50 flex-col p-2 text-light" style="background:{{color}};">
            <h3 class="text-light">Recently played<h3>
                    <div class="bg-light p-4 flex justify-center items-center" id="music">
                <div class="relative" style="z-index:99">
                        <div id="listening" class=" gap-3 flex flex-row"></div>
                    </div></div>
        </article>
    </div>
    <div class="flex-row flex" style="gap:.5em">
        <article class="w-50 flex-col p-2 text-light" style="background:{{color}};">
            <h3 class="text-light" >Anything going on?<h3>
                    <div class="bg-light p-4" id="new">
                    <div class="relative" style="z-index:99">
                    <h4 class="w-100 text-center">THE UNDERTALE SYMPHONY</h4>
                        <p id="utcount"></p>
                        </div>
                    </div>
        </article>
        <article class="w-50 flex-col p-2 text-light" style="background:{{color}};">
            <h3 class="text-light">Latest site update<h3>
                    <div class="bg-light p-4" id="update">
                        <div class="relative" style="z-index:99">
                            <time datetime="2026-10-15" class="text-center w-100 text-red block">10/10/26</time>
                            <hr>
                            <p class="pm0 text-2xl text-center">Site v6 is launched! It's good to be back.</p>
                        </div>
                    </div>
        </article>
    </div>
</div>

