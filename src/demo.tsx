interface duck{
    name:string
    numLegs:number
    makeSound:(sound:string)=>void;
}

const duck1:duck={
  name:'huey',
numLegs:2,
makeSound:(sound:string)=>console.log(sound)
}

const duck2:duck={
    name:'duey',
  numLegs:2,
  makeSound:(sound:string)=>console.log(sound)
  }

  duck1.makeSound('quak');
  duck2.makeSound('sound');

export const ducks=[duck1,duck2];


