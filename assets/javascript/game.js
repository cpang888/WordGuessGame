
    // var words = ['usa', 'canada', 'china'];
    var words = [
      {name: "usa", image: "usa.PNG", sound: "usa.mp3"},
      {name: "canada", image: "canada.PNG", sound: "canada.mp3"},
      {name: "china", image: "china.PNG", sound: "china.mp3"}
    ];
    
    var image;
    var countryAnthem;
    var index;

    var game = {
      guessed: [],
      left: 10,
      start: function() {
        this.complete = false;
        index = Math.floor(Math.random() * words.length);
        this.word = words[index].name;
        image = words[index].image;
        countryAnthem = words[index].sound;
        this.$right = document.getElementById('right');
        this.$wrong = document.getElementById('wrong');
        this.$remain = document.getElementById('remain');
        this.$right.innerHTML = '_'.repeat(this.word.length);
      },
      guess: function(letter) {
        if (this.left > 0 && this.complete != true) {
          if (this.word.indexOf(letter) > -1 || this.guessed.indexOf(letter) > -1) {
            this.right(letter);
          } else {
            this.wrong(letter);
          }
        }
      },
      right: function(letter) {
        for(var i = 0; i < this.word.length; i++) {
          if (this.word[i] == letter) {
            var word = this.$right.innerHTML.split('');
            word[i] = letter;
            this.$right.innerHTML = word.join('');
          }
        }
        if (this.$right.innerHTML.indexOf('_') < 0) {
          // alert('you win!');
          this.complete = true;

          var countries = $("#countries");
          var imageCountry = $("<img>");

          // First each country will be given the class ".country-image".
          // This will allow the CSS to take effect.
          imageCountry.addClass("country-image");

          // Each imageCountry will be given a src link to the country image
          imageCountry.attr("src", "assets/images/" + image);

          // Lastly, each country image (with all it classes and attributes) will get added to the page.
          countries.append(imageCountry);

          // play music
          var audioElement = document.createElement("audio");
          audioElement.setAttribute("src", "assets/sounds/" + countryAnthem);
          audioElement.play();
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
          alert('you lose! '+ this.word);
          this.complete = true;
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
    