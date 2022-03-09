#!/usr/bin/env node

'use strict';

const fs = require('fs');

const inputFile = process.argv[2];

const getText = (mid) => {
  return project.materials.texts.find(element => element.id == mid).content
}

const toSubripTimestamp = (sec_num) => {
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));
  let ms = Math.floor((sec_num - (hours * 3600) - (minutes * 60) - seconds) * 1000);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  if (ms < 100) {ms = "0"+ms;}
  if (ms < 10) {ms = "00"+ms;}
  return hours+':'+minutes+':'+seconds+','+ms;
}

const timeToText = (start, dur) => {
  let end = start + dur

  return toSubripTimestamp(start/1000000) + ' --> ' + toSubripTimestamp(end/1000000)
}

let rawdata = fs.readFileSync(inputFile);
let project = JSON.parse(rawdata);

let subidx = 1

project.tracks.forEach(track => {
  if (track.type == "text") {
    track.segments.forEach(item => {
      let startTime = item.target_timerange.start
      let duration = item.target_timerange.duration
      let mid = item.material_id
      let text = getText(mid)
      console.log(subidx++)
      console.log(timeToText(startTime, duration))
      console.log(text)
      console.log("")
    })
  }
})
