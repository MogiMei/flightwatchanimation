//animatePlane(new Date(PHP TIMESTAMP START * 1000), new Date(PHP TIMESTAMP LANDUNG * 1000), ID als String);

function animateWithValues() {
    let d = new Date();
    let x = document.getElementById("time2startselect");
    let y = document.getElementById("time2landingselect");
    let hourtime = x.value;
    hourtime * 10 / 10;
    let h = hourtime / 100;
    let m = hourtime % 100;
    let hourtime2 = y.value;
    hourtime2 * 10 / 10;
    let h2 = hourtime2 / 100;
    let m2 = hourtime2 % 100;
    animatePlane(new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), h, m), new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), h2, m2), "flighticon2");
  }

  function myFunction() {
    let d = new Date();
    var x = document.createElement("SELECT");
    x.setAttribute("id", "time2startselect");
    document.getElementById("time2start").appendChild(x);
    addTimes("time2startselect");
    x.value = d.getUTCHours() - 1 + "00";
    var y = document.createElement("SELECT");
    y.setAttribute("id", "time2landingselect");
    document.getElementById("time2landing").appendChild(y);
    addTimes("time2landingselect");
    y.value = d.getUTCHours() + 1 + "00";
    x.addEventListener("click", function() {
      animateWithValues();
    });
    y.addEventListener("click", function() {
      animateWithValues();
    });
  }

  function addTimes(id) {
    for(let i = 0; i < 24; i++) {
      for(let j = 0; j < 2; j++) {
        let text = "";
        let vl = "";
        if(i < 10) {
          text += "0" + i + ":";
        } else {
          text += i + ":";
        }
        vl += i;
        if(j == 0) {
          text += "00";
          vl += "00";
        } else {
          text += "30";
          vl += "30";
        }
        var z = document.createElement("option");
        z.setAttribute("value", vl);
        var t = document.createTextNode(text);
        z.appendChild(t);
        document.getElementById(id).appendChild(z);
      }
    }
  }

  window.onload = function() {
    myFunction();
    let d = new Date();
    animateWithValues();
    writeTime();
    setInterval(writeTime, 1000);
  }

  function writeTime() {
    let d = new Date();
    let el = document.getElementById("time");
    let h = d.getUTCHours();
    if(h < 10) {
      h = "0" + h;
    }
    let m = d.getUTCMinutes();
    if(m < 10) {
      m = "0" + m;
    }
    let s = d.getUTCSeconds();
    if(s < 10) {
      s = "0" + s;
    }
    el.innerHTML = h + ":" + m + ":" + s;
  }

  function changeTime(elid) {
    let d = new Date();
    let id = document.getElementById(elid);
    let now = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes());
    let morning = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 6, 0);
    let evening = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 18, 0);
    let midnight = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 0, 0);
    if(now > evening) {
      document.body.style.backgroundColor = "#333333";
      document.body.style.color = "white";
    } else if(now > morning) {
      document.body.style.backgroundColor = "white"
      document.body.style.color = "black";
    } else if(now > midnight) {
      document.body.style.backgroundColor = "#333333";
      document.body.style.color = "white";
    }
  }

  function animatePlane(starttime, endtime, id) {
    let d = new Date();
    let currenttime = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes());
    let date1 = starttime;
    let date2 = endtime;
    if(currenttime < date1) {
      let el = document.getElementById(id);
      el.style.left = "-30px";
      window.setTimeout(function() {
        actualAnimation(date1, date2, id);
      }, (currenttime - date1) * -1);
    } else {
      actualAnimation(date1, date2, id);
    }
  }


  function actualAnimation(starttime, endtime, id) {
    if(typeof interval !== "undefined") {
      clearInterval(interval);
    }
    let d = new Date();
    let currenttime = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
    let date1 = starttime;
    let date2 = endtime;
    if(!(currenttime > date2)) {
      let difference = date2 - date1;
      let el = document.getElementById(id);
      let percent = (date1 - currenttime) / (date1 - date2) * 100;
      let pos = map(percent, 0, 100, -30, 370);
      el.style.left = pos + "px";
      window.interval = setInterval(function() {
        d = new Date();
        let currenttime = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
        percent = (date1 - currenttime) / (date1 - date2) * 100;
        pos = map(percent, 0, 100, -30, 370);
        el.style.left = pos + "px";
        changeTime();
        if(pos >= 370) {
          el.style.left = "370px";
          clearInterval(interval);
        }
      }, 1000);
    } else {
      let el = document.getElementById(id);
      el.style.left = "370px";
    }
    changeTime()
  }

  function map(n, start1, stop1, start2, stop2, withinBounds) {
    var newval = ((n - start1)/(stop1 - start1)) * (stop2 - start2) + start2;
    if (!withinBounds) {
      return newval;
    }
    if (start2 < stop2) {
      return constrain(newval, start2, stop2);
    } else {
      return constrain(newval, stop2, start2);
    }
  };

  function constrain(n, low, high) {
    return Math.max(Math.min(n, high), low);
  };