(function(){

    var app = angular.module("labyrinth", []);

    app.controller("CharCreateController", function(){
        this.newCharChoices = {};
        this.addCharChoices = function(name, race, occupation){
            var id = randomIntFromInterval(0, 999999999);
            id = new Creature(name, race, occupation);
            attrSetter(id);
            pointSetter(id);
            itemSetter(id);
            damageSetter(id);
            defenseSetter(id);
            this.newChar = id;
            console.log(id);
        };

    });



    Creature.prototype = {
        someFunction: function(){console.log("It works.");}
    };

    function Creature(name, race, occupation){
        this.name = name;
        this.race = race;
        this.occupation = occupation;
        this.integrity = 100;
    }

    

    function randomIntFromInterval(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }


    function Weapon(name, damage, defense, reach, durability){
        this.name = name;
        this.damage = damage;
        this.defense = defense;
        this.reach = reach;
        this.durability = durability;
    }

    var bareHand = new Weapon("bare hands", 10, 5, 1, 0);

    var shortsword = new Weapon("shortsword", 40, 25, 1.5, 100);

    var shortbow = new Weapon("shortbow", 30, 25, 100, 10);

    var dagger = new Weapon("dagger", 25, 10, 1, 50);


    function attrSetter(creature){
        if(creature.race === "human"){
            creature.strength = randomIntFromInterval(10, 15);
            creature.vitality = randomIntFromInterval(10, 15);
            creature.endurance = randomIntFromInterval(10, 12);
            creature.dexterity = randomIntFromInterval(10, 15);
        }else if(creature.race === "elf"){
            creature.strength = randomIntFromInterval(10, 15) - 1;
            creature.vitality = randomIntFromInterval(10, 15);
            creature.endurance = randomIntFromInterval(10, 12);
            creature.dexterity = randomIntFromInterval(10, 15) + 2;
        }else if(creature.race === "orc"){
            creature.strength = randomIntFromInterval(10, 15) + 2;
            creature.vitality = randomIntFromInterval(10, 15);
            creature.endurance = randomIntFromInterval(10, 12) + 1;
            creature.dexterity = randomIntFromInterval(10, 15) - 2;
        }

        if(creature.occupation === "warrior"){
            creature.strength += 1;
            creature.vitality += 1;
        }else if(creature.occupation === "ranger"){
            creature.dexterity += 2;
        }else if(creature.occupation === "wizard"){

        }

    }

    function pointSetter(creature){
        if(creature.race === "human"){
            creature.hp = creature.strength * creature.vitality;
            creature.cp = creature.strength * creature.endurance;
        }else if(creature.race === "elf"){
            creature.hp = creature.strength * creature.vitality;
            creature.cp = creature.strength * creature.endurance;
        }else if(creature.race === "orc"){
            creature.hp = creature.strength * creature.vitality;
            creature.cp = creature.strength * creature.endurance;
        }
    }

    function itemSetter(creature){
        creature.equippedWeaponsRighrt = [bareHand];
        creature.equippedWeaponsLeft = [bareHand];
        
        if(creature.occupation === "warrior"){
            creature.inv = [shortsword];
        }else if(creature.occupation === "ranger"){
            creature.inv = [shortbow, dagger];
        }else if(creature.occupation === "wizard"){
            creature.inv = [dagger];
        }

    }

    function damageSetter(creature){
        creature.damageRight = 0;
        for(i=0; i<creature.equippedWeaponsRighrt.length; i++){
            creature.damageRight = creature.damageRight + creature.equippedWeaponsRighrt[i].damage;
        }

        creature.damageLeft = 0;
        for(i=0; i<creature.equippedWeaponsLeft.length; i++){
            creature.damageLeft = creature.damageLeft + creature.equippedWeaponsLeft[i].damage;
        }
    }

    function defenseSetter(creature){
        creature.defense = 0;
        for(i=0; i<creature.equippedWeaponsRighrt.length; i++){
            creature.defense = creature.defense + creature.equippedWeaponsRighrt[i].defense;
        }
        for(i=0; i<creature.equippedWeaponsLeft.length; i++){
            creature.defense = creature.defense + creature.equippedWeaponsLeft[i].defense;
        }
    }


})();