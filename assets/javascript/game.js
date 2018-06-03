
    // var words = ['usa', 'canada', 'china'];
    var words = [
      {name: "usa", image: "usa.PNG", sound: "usa.mp3"},
      {name: "canada", image: "canada.PNG", sound: "canada.mp3"},
      {name: "china", image: "china.PNG", sound: "china.mp3"}
    ];

    var game = {
      guessed: [],
      left: 10,
      reset: function () {
        // reset the selector 'right', 'left', 'remain, and 'wrong'
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
        this.guessed.push(letter);
        this.$wrong.innerHTML += ' ' + letter;

        // set style to a DOM object
        this.$wrong.style.textTransform = "capitalize";

        this.left--;
        this.$remain.innerHTML = this.left;
        if (this.left < 1) {
          alert('You lose! The answer is '+ this.word);
          this.complete = true;

          var response = confirm("Would you like to try again?");
          if (response == true) {
            game.reset();
            game.start();
          }
        } 
      }
    };
    $(document).ready(function() {
      game.start();
      document.onkeyup = function(event) {
        var letter = String.fromCharCode(event.keyCode).toLowerCase();
        game.guess(letter);
      };
    });
    