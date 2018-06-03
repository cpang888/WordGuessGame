

    // this is an array with objects.
    // each object contains name, image and sound
    var words = [
      {name: "usa", image: "usa.PNG", sound: "usa.mp3"},
      {name: "canada", image: "canada.PNG", sound: "canada.mp3"},
      {name: "china", image: "china.PNG", sound: "china.mp3"}
    ];

    // this is game object
    var game = {
      guessed: [],
      left: 10,
      reset: function () {
        // reset all selectors 'right', 'left', 'remain, and 'wrong'
        this.$right.innerHTML = '';
        this.left = 10;
        this.$remain.innerHTML = this.left;
        this.$wrong.innerHTML = '';
      },
      start: function() {
        this.complete = false;
        // pick a random number between 0 to the length of the words
        this.index = Math.floor(Math.random() * words.length);
        // get the country name from the words object
        this.word = words[this.index].name;
        // get the image name from the words object
        this.image = words[this.index].image;
        // get the country anthem from the words object
        this.countryAnthem = words[this.index].sound;
        // get the 'right' selector. Returns a set of elements found in the DOM 'right'
        this.$right = document.getElementById('right');
        // get the 'right' selector. Returns a set of elements found in the DOM 'wrong'
        this.$wrong = document.getElementById('wrong');
        // get the 'right' selector. Returns a set of elements found in the DOM 'remain'
        this.$remain = document.getElementById('remain');
        // display '_' for each character in the word
        this.$right.innerHTML = '_'.repeat(this.word.length);
      },
      guess: function(letter) {
        // player press a key 'letter' from the keyboard
        if (this.left > 0 && this.complete != true) {
          // remaining guess is greater than 0 and the game is not completed
          // check the key input is it part of the 'word' or in the already guessed array
          if (this.word.indexOf(letter) > -1 || this.guessed.indexOf(letter) > -1) {
            // player guessed the letter right. Go to the right function
            this.right(letter);
          } else {
            // player guessed it wrong. Go to the wrong function
            this.wrong(letter);
          }
        }
      },
      right: function(letter) {
        // for each letter in the word
        for(var i = 0; i < this.word.length; i++) {
          // compare it with user input 'letter'
          if (this.word[i] == letter) {
            // if equal, assign the letter to the new local variable word
            // split() returns an array on which join() can be applied
            /* Example of split() and join()
              var str = 'asdfghjkl';
              var strReverse = str.split('').reverse().join(''); // 'lkjhgfdsa'
              // split() returns an array on which reverse() and join() can be applied
            */
            var word = this.$right.innerHTML.split('');
            word[i] = letter;
            this.$right.innerHTML = word.join('');
          }
        }
        if (this.$right.innerHTML.indexOf('_') < 0) {
          // if there is no more '_' in the $right selector
          // show the country's image and play the anthem
          var countries = $("#countries");
          var imageCountry = $("<img>");

          // First each country will be given the class ".country-image".
          // This will allow the CSS to take effect.
          imageCountry.addClass("country-image");

          // Each imageCountry will be given a src link to the country image
          imageCountry.attr("src", "assets/images/" + this.image);

          // Lastly, each country image (with all it classes and attributes) will get added to the page.
          countries.append(imageCountry);

          // play music
          var audioElement = document.createElement("audio");
          audioElement.setAttribute("src", "assets/sounds/" + this.countryAnthem);
          audioElement.play();

          this.complete = true;

        }
      },
      wrong: function(letter) {
        // user guessed the letter wrong. 
        // add the user guessed letter to the guessed array
        this.guessed.push(letter);
        this.$wrong.innerHTML += ' ' + letter;

        // set style to a DOM object
        // make the guessed array all upper case
        this.$wrong.style.textTransform = "capitalize";

        // Remaining guess need to reduce one
        this.left--;
        // show remaining guessed count on brower
        this.$remain.innerHTML = this.left;
        if (this.left < 1) {
          // remaining guessed is 0. User lose!
          alert('You lose! The answer is '+ this.word);
          // game is completed. Set the complete to true
          this.complete = true;

          // ask player if he/she would like to play again
          var response = confirm("Would you like to try again?");
          if (response == true) {
            // if player would like to play again, call the reset function
            // which reset all selector
            game.reset();
            // call start function to start a new game
            game.start();
          }
        } 
      }
    };
    $(document).ready(function() {
      // start the game only if brower is loaded all properties completely
      game.start();
      document.onkeyup = function(event) {
        // player pressed a key. Assign the key to variable letter
        var letter = String.fromCharCode(event.keyCode).toLowerCase();
        // pass the letter to the guess function to determine win/lose
        game.guess(letter);
      };
    });
    