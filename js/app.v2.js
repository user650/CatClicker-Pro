// ss01 11/10/2015 - modified with my own cats.

/* ======= Model ======= */

var model = {
    adminHidden: true, // starts hidden; this boolean will be used to keep track of the state of admin section..
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Tabby',
            imgSrc : 'img/434164568_fea0ad4013_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
        },
        {
            clickCount : 0,
            name : 'Bob',
            imgSrc : 'https://www.petfinder.com/wp-content/uploads/2012/11/151531698-stop-cat-jumping-table-632x475-253x190.jpg',
            imgAttribution : 'https://www.petfinder.com/wp-content/uploads/2012/11/'
        },
        {
            clickCount : 0,
            name : 'Scaredy',
            imgSrc : 'img/22252709_010df3379e_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
        },
        {
            clickCount : 0,
            name : 'No No cat',
//            imgSrc : 'img/1413379559_412a540d29_z.jpg',
            imgSrc : 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQF_oJMWf8QU67WvuPfCVbJlmz5PMAQm2y42ZEv8t9-9H-hdtIsrQ',
            imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
        },
        {
            clickCount : 0,
            name : 'Sleepy',
            imgSrc : 'img/9648464288_2516b35537_z.jpg',
            imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        console.log('calling the octoput.init function');
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
        formView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
        formView.renderForm();
    },

    //function toggles the hide class from the admin section
    toggleAdminView: function() {
        console.log('adminHidden BEFORE = ' + model.adminHidden);
        if (model.adminHidden) {
            formView.adminFormElem.classList.remove("hide");
        }
        else {
            formView.adminFormElem.classList.add("hide");
        }
        model.adminHidden = !model.adminHidden;
        console.log('adminHidden AFTER = ' + model.adminHidden);
        catView.render();
    },

    updateCurrentCat: function(newCat) {
        model.currentCat.name = newCat.name;
        model.currentCat.imgSrc = newCat.imgSrc;
        model.currentCat.clickCount = newCat.clickCount;
    },
};

/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');
     
        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var renderCat = octopus.getCurrentCat();
        this.countElem.textContent = renderCat.clickCount;
        this.catNameElem.textContent = renderCat.name;
        this.catImageElem.src = renderCat.imgSrc;
    }
};

var catListView = {
    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, li, a,  i;

        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();
        console.log('got these cats: ' + cats);

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            li = document.createElement('li');
            a = document.createElement('a');
            a.textContent = cat.name;
            a.href = '#' + cat.name;
            li.appendChild(a);

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            a.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    formView.renderForm();
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(li);
        }
    }
};

var formView = {
   init: function() {
        this.adminFormElem = document.getElementById('adminForm');
        this.adminButtonElem = document.getElementById('adminButton');
        this.nameText = document.getElementById('nameText');
        this.URLText = document.getElementById('URLText');
        this.clickCountText = document.getElementById('clickCountText');
        this.btnCancel = document.getElementById('cancel');
        this.form = document.getElementById('adminForm');  // form for the admin section

        //on click toggle the Admin button toggle the admin section
        this.adminButtonElem.addEventListener("click", function(){
                                                                    octopus.toggleAdminView();
                                                                 }
                                             );

        //on click of the Cancel, toggle the admin section
        this.btnCancel.addEventListener("click", function(e){
            e.preventDefault();
            octopus.toggleAdminView();
        });

        //on click of save - run the form save procedure
        this.adminFormElem.addEventListener("submit", function(e){
            e.preventDefault();
            formView.handleFormSave();
        });

        this.renderForm();
    },

    renderForm: function() {
        var renderCat = octopus.getCurrentCat();

        // update the DOM elements with values from the current cat
        this.clickCountText.value = renderCat.clickCount;
        this.nameText.value = renderCat.name;
        this.URLText.value = renderCat.imgSrc;
    },

    handleFormSave: function(){
    // grab the form elements from the admin section of the screen
    var nameEl = document.getElementById("nameText"),
        imageSrcEl = document.getElementById("URLText"),
        clickCountEl = document.getElementById("clickCountText"),
        newCat = {}; // used as a temp for the current cat

    // populate newCat with the current text entries within the form section.
    // then use that to populate the current cat in the model
    newCat.name = nameEl.value;
    newCat.imgSrc = imageSrcEl.value;
    newCat.clickCount = clickCountEl.value;
    octopus.updateCurrentCat(newCat);

    // re-render sections
    catListView.render();
    catView.render();

    // If you wanted to hide the admine section after a save then you would include this line.
    //octopus.toggleAdminView();
  }
};

// make it go!
octopus.init();