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
            name : 'Shadow',
            imgSrc : 'img/1413379559_412a540d29_z.jpg',
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
    },

    //function toggles the hide class from the admin section
    toggleAdminView: function() {
        console.log('adminHidden BEFORE = ' + model.adminHidden);
        if (model.adminHidden) {
            catView.adminFormElem.classList.remove("hide");
        }
        else {
            catView.adminFormElem.classList.add("hide");
        }
        model.adminHidden = !model.adminHidden;
        console.log('adminHidden AFTER = ' + model.adminHidden);
        catView.render();
    },

    //function saves the content of the text fields to the html fields
    save: function() {
        console.log('save function name = :' + catView.nameText);
        currentCat.name = catView.nameText;
        console.log('save function URL = ' + catView.URLText);
        console.log('save function countClick = ' + catView.clickCountText);
    }
};

/* ======= View ======= */

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');
        this.adminFormElem = document.getElementById('adminForm');
        this.adminButtonElem = document.getElementById('adminButton');
        this.saveButton = document.getElementById('saveButton');
        this.cancelButton = document.getElementById('cancelButton');
        this.nameText = document.getElementById('nameText');
        this.URLText = document.getElementById('URL');
        this.clickCountText = document.getElementById('clickCount');

        // render this view (update the DOM elements with the right values)
        this.render();
        
        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        //on click toggle the Admin view
        this.adminButtonElem.addEventListener("click", function(){
            octopus.toggleAdminView();
        });

        //on click of save
        this.saveButton.addEventListener("click", function(){
            octopus.save();
        });

        //on click of save
        this.cancelButton.addEventListener("click", function(){
            octopus.toggleAdminView();
        });

    },

    render: function() {
        // update the DOM elements with values from the current cat
        console.log('OK. who started the render catView.render function');
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = "Cat Clicks : " + currentCat.clickCount;
        this.catNameElem.textContent = "Cat :" + currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
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
        console.log('catListView.render function');
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();
console.log('init was called');