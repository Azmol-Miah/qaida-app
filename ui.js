// Get all the pages to be displayed
let currentPage = document.querySelector(".letters");

// Get current number element and add options
const currentPageNumber = document.getElementById("pageNumber");
let options;
for (let i = 0; i <= 40; i++) {
  options += `<option>${i}</option>`;
}
currentPageNumber.innerHTML += options;

// Get the next or next page element// Get the previous or previous page element
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");

// Create new XMLHttpRequest request
let xhttp = new XMLHttpRequest();
xhttp.onload = function() {
  // If server status was ok
  if (this.status === 200) {
    // parsing the json data from the json file as an object// Get property values of the keys in an array
    let response = JSON.parse(xhttp.responseText);
    let obj = Object.values(response);

    /*Set a variable with the value of 0 to use to iterate over pages, to display current
            page number, iterate current index of page divs or obj variable arrays*/
    let current = 0;
    let output;
    let outputTwo;
    let outputThree;

    // Add second row
    const sectionElement = document.createElement("tr");
    sectionElement.className = "letters mt-3";
    const sectionTwo = currentPage.parentElement.appendChild(sectionElement);

    const sectionElementThree = document.createElement("tr");
    sectionElementThree.className = "letters mt-3";
    const sectionThree = currentPage.parentElement.appendChild(
      sectionElementThree
    );

    /* Rest or clear the page when this function is called intended when new page loads
            just before the new content is loaded*/

    class Section {
      constructor(outputNum, sectionNum) {
        this.outputNum = outputNum;
        this.sectionNum = sectionNum;
      }

      sections(letterNum) {
        this.outputNum += `<td id="${letterNum.name}"><img src="
          ${letterNum.image}"></td>`;
        this.sectionNum.innerHTML = this.outputNum;
      }

      resets() {
        while (currentPage.firstChild) {
          currentPage.removeChild(currentPage.firstChild);
        }
        output = "";
        this.outputNum = "";
        this.sectionNum.innerHTML = "";
      }
    }

    // console.log(obj.length - 1);

    const sectionone = new Section(output, currentPage),
      sectiontwo = new Section(outputTwo, sectionTwo),
      sectionthree = new Section(outputThree, sectionThree);

    function reset() {
      sectionone.resets();
      sectiontwo.resets();
      sectionthree.resets();
    }

    class Letters {
      constructor(objects) {
        this.object = objects;
      }

      static pageTitle(img, titleHeight) {
        const newTd = document.createElement("td");
        newTd.style.padding = "4px";
        newTd.style.height = titleHeight;
        newTd.innerHTML = `<img  src="${img}">`;
        const td = document.getElementsByTagName("td");
        currentPage.insertBefore(newTd, td[0]);
      }

      sectionLetters() {
        if (this.object.length == 2) {
          // If page has two sectins
          this.object[0].sectOne.forEach(one => {
            sectionone.sections(one);
          });
          this.object[1].sectTwo.forEach(two => {
            sectiontwo.sections(two);
          });
        } else if (this.object.length == 3) {
          // If page has three sections
          this.object[0].sectOne.forEach(one => {
            sectionone.sections(one);
          });
          this.object[1].sectTwo.forEach(two => {
            sectiontwo.sections(two);
          });
          this.object[2].sectThree.forEach(three => {
            sectionthree.sections(three);
          });
        } else {
          // if page has one section
          for (let i = 0; i < this.object.length; i++) {
            output += `<td id="${this.object[i].name}" ><img src="${
              this.object[i].image
            }"></td>`;
            currentPage.innerHTML = output;
          }
        }
        let letterimg = document.getElementsByTagName("img");

        if (this.object == obj[0]) {
          Letters.pageTitle("img/firstpagetitle.png", "44.5px");
          for (let i = 0; i < letterimg.length; i++) {
            letterimg[0].style.width = "100%";
            letterimg[0].style.height = "44.5px";
            letterimg[i].style.width = "80px";
            letterimg[i].style.height = "70px";
          }
        } else if (this.object == obj[1]) {
          Letters.pageTitle("img/pg2/secondpagetitle.png", "44.5px");
          for (let i = 0; i < letterimg.length; i++) {
            letterimg[0].style.width = "100%";
            letterimg[i].style.width = "66.3px";
            letterimg[i].style.height = "44.5px";
          }
        } else if (this.object == obj[2]) {
          for (let i = 0; i < letterimg.length; i++) {
            letterimg[i].style.width = "66.3px";
            letterimg[i].style.height = "44.5px";
          }
        }
      }
    }

    function getAllLetters(indexNum) {
      const getallletters = new Letters(obj[indexNum]);
      getallletters.sectionLetters();
    }

    // Set the first page to be displayed when windows loaded
    function startQaida() {
      // reset the page to clear first
      reset();
      getAllLetters(current);
    } //--closing brace startQaida()

    //display content each time going to previous page
    function previousPage() {
      reset();
      // Drop down option
      currentPageNumber.selectedIndex = current - 1;
      getAllLetters(current - 1);
      checkBookMark(current - 1);
      current--;
    } //--Closing brace previousPage()

    // display content each time going to next page*
    function nextPage() {
      reset();
      // Drop down option
      currentPageNumber.selectedIndex = current + 1;
      getAllLetters(current + 1);
      checkBookMark(current + 1);
      current++;
    } //--Closing brace nextPage()

    //Get the previous button and add event
    prev.addEventListener("click", function() {
      if (current === 0) {
        current = obj.length;
      }
      previousPage();
    });

    //Get the next button and add event
    next.addEventListener("click", function() {
      if (current === obj.length - 1) {
        current = -1;
      }
      nextPage();
    });

    // ========================================= SOUND FUNCTION ================================== //
    // Set empty sound variable, Setting the Audio Object, concatenate file extensions
    const folder = "audio/";
    const extension = ".mp3";
    let sound;
    sound = new Audio();

    function sndSrc(source) {
      sound.src = folder + source + extension;
    }

    // If play loop has reached end of last letter
    function playPauseBtn(objLength, removeAllBgBlue) {
      if (playIndex == objLength) {
        playPaused.classList.remove("fa-pause");
        playPaused.classList.add("fa-play");
        setTimeout(function() {
          for (let i = 0; i < removeAllBgBlue.length; i++) {
            removeAllBgBlue[i].classList.remove("bgBlue");
          }
        }, 1000);
      } else {
        playPaused.classList.remove("fa-play");
        playPaused.classList.add("fa-pause");
      }
    }

    let playIndex = 0;
    let playPaused = document.getElementById("playBtn");

    playPaused.addEventListener("mousedown", () => {
      if (sound.paused) {
        playPaused.classList.remove("fa-play");
        playPaused.classList.add("fa-pause");
        switchSound();
      } else {
        sound.pause();
        playPaused.classList.remove("fa-pause");
        playPaused.classList.add("fa-play");
      }
    });

    let twoSectionConcat;
    let sectTwoArr;

    function sectionLoop() {
      // If two section
      if (obj[current].length == 2) {
        twoSectionConcat = obj[current][0].sectOne.concat(
          obj[current][1].sectTwo
        );
        playPauseBtn(twoSectionConcat.length, sectTwoArr);
        sndSrc(twoSectionConcat[playIndex].name);
        let sectOneArr = Array.from(
          currentPage.parentElement.firstChild.children
        );
        sectTwoArr = sectOneArr.concat(
          Array.from(currentPage.parentElement.children[1].children)
        );
        sectTwoArr[playIndex].classList.add("bgBlue");
        // If Three section
      } else if (obj[current].length == 3) {
        let threeSectionConcat = twoSectionConcat.concat(
          obj[current][2].sectThree
        );
        playPauseBtn(threeSectionConcat.length, sectThreeArr);
        sndSrc(threeSectionConcat[playIndex].name);
        let sectThreeArr = sectTwoArr.concat(
          Array.from(currentPage.parentElement.children[2].children)
        );
        sectThreeArr[playIndex].classList.add("bgBlue");
      } else {
        playPauseBtn(obj[current].length, currentPage.children);
        sndSrc(obj[current][playIndex].name);
        currentPage.children[playIndex].classList.add("bgBlue");
      }
    }

    sound.addEventListener("ended", switchSound);
    function switchSound() {
      sectionLoop();
      sound.play();
      playIndex++;
    }

    // Play clicking individual sounds
    currentPage.parentElement.addEventListener("click", selectSound);
    function selectSound(e) {
      let soundTwo = new Audio();
      // Get id name of each sound image thats outputed
      soundTwo.src = folder + e.path[1].id + extension;
      if (soundTwo.paused) {
        soundTwo.play();
      }
    }

    // =========================================== SELECT OPTIONS ======================================= //
    currentPageNumber.addEventListener("change", options);

    function options(e) {
      reset();
      // Set current to option target value
      current = Number(e.target.value);
      checkBookMark(current);
      getAllLetters(current);
    }

    // =========================================== Book Mark ================================== //
    let pageNumber = JSON.parse(localStorage.getItem("pageNumber"));
    //Local storage set bookmark
    let bookMarkIcon = document.getElementById("bookmark");
    bookMarkIcon.addEventListener("mousedown", bookMark);

    //Check Bookmark and fill if current bookMark

    function checkBookMark(pagenumber) {
      if (pageNumber === pagenumber) {
        bookMarkIcon.classList.remove("fa-bookmark-o");
        bookMarkIcon.classList.add("fa-bookmark");
      } else {
        bookMarkIcon.classList.remove("fa-bookmark");
        bookMarkIcon.classList.add("fa-bookmark-o");
      }
    }

    function bookMark() {
      localStorage.setItem("pageNumber", JSON.stringify(current));
      checkBookMark(pageNumber);
      window.location.reload();
    }

    if (performance.navigation.type == 1) {
      getBookMark();
    }

    let bookMarkRef = document.getElementById("bookMarkRef");
    bookMarkRef.addEventListener("mousedown", getBookMark);

    // Local storage get bookmark
    function getBookMark() {
      currentPageNumber.selectedIndex = JSON.parse(
        localStorage.getItem("pageNumber")
      );
      current = pageNumber;
      reset();
      checkBookMark(current);
      const bookMarkLetter = new Letters(obj[current]);
      bookMarkLetter.sectionLetters();
    }
    // Call the function to display the first page content
    startQaida();
  } //--closing brace if readystate and status
}; //--Closing brace on xhttp onreadystate change object

// Use Ajax to get json data locally
xhttp.open("GET", "js/qaida.json", true);
//Send ajax request
xhttp.send();
