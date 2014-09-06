// Year 1.
// Year 2.
// Year 3. //
// Year 4: all to 12
// Year 5: 
//

year = 4;

var operators = {
  "multiply" : {
    description : "multiplication",
    operator : "x",
    func : function (a, b) {
      return a * b;
    }
  },
  "divide" : {
    description : "division",
    operator : "/",
    func : function (a, b) {
      return a / b;
    }
  },
  "subtract" : {
    description : "subtraction",
    operator : "-",
    func : function (a, b) {
      return a - b;
    }
  },
  "add" : {
    description : "addition",
    operator : "+",
    func : function (a, b) {
      return a + b;
    }
  },
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getListItemGenerator(list) {
  return function() {
    return list[getRandomInt(0,list.length)];
  };
}

function getRangeItemGenerator(min, max) {
  return function() {
    return getRandomInt(min, max+1);
  };
}

var years = {
  // 1
  1 : {

  },
  // 2 Number bonds to 20
  //   Count in steps 2, 3, 5, 0 and in tens, from any number.
  //   Compare and order from 1 to 100
  //   addition and subtractions, 2 digit and 1, to digits and tens,
  //   2 two digits, and 2 one digits
  //
  //   Multiplication tables; 2, 5 and 10
  //
  //   Be able to tell the time...
  2 : {

  },
  // 3 Count multiples of 4, 8, 50, 100
  //   Compare and order numbers to 1000
  //   Read and write to 1000 in numerals and words
  //   Handle multiples of 2, 3, 4, 5, 8, 10, 50 and 100
  //
  //   Add and subtract: 3 digit and ones (167 and 9)
  //                     and tens
  //                     and hundreds
  //
  //   Times tables: 3, 4 and 8
  3 : {

  },
  // 4 all times tables to 12
  4 : {
    games : [
    {
      operator : "multiply",
      operands : [
          getRangeItemGenerator(1,12),
          getRangeItemGenerator(1,12)
          ]
    },

        ]
  },
  // 5 add and subtract mentally increasingly large numbers
  //     e.g. 12462- 2300
  //   Multiply and divide mentally
  //     All times tables - (which?)
  //   Know prime numbers up to 19
  //
  //   Add and subtract tenths and 1 digit whole numbers and tenths
  5 : {

  },
  // 6
  6 : {

  }
};

function ProblemManager() {
  this.refreshProblem();
}

ProblemManager.prototype = {
  generateProblem : function() {
    var games = years[year].games;
    var game = games[getRandomInt(0,games.length)];
    var operator = operators[game.operator];
    var a = game.operands[0]();
    var b = game.operands[1]();
    return {
      problem : ''+a+' '+operator.operator+' '+b,
      check: function(ans) {
        return ans === operator.func(a,b);
      },
    };
  },
  refreshProblem  : function() {
    console.log('refresh problem');
    this.currentProblem = this.generateProblem();
  }
};

var mgr = new ProblemManager();

function showResult(result) {
  var correct = document.getElementById("correct");
  var incorrect = document.getElementById("incorrect");

  var show = correct;

  if (!result) {
    show = incorrect;
  }

  show.style.display = 'inline';
  setTimeout(function() {
    show.style.display = 'none';
  }, 1000);
}

function checkAnswer() {
  var ans = parseInt(document.getElementById('answer').value);
  console.log("answer provided is "+ans);
  var correct = mgr.currentProblem.check(ans);
  showResult(correct);
  if(correct) {
    refresh();
  }
}

function refresh() {
  // get a new probem from the probem generator
  mgr.refreshProblem();
  document.getElementById('answer').value = '';
  // clear the problem
  var problem = document.getElementById('problem');
  while(problem.firstChild) {
     problem.removeChild(problem.firstChild);
  }
  // set the new problem
  problem.appendChild(document.createTextNode(mgr.currentProblem.problem));
  // clear the answer box
}

function setupBackspace() {
  var answer = document.getElementById('answer');
  function backClicked() {
    var length = answer.value.length;
    if (length > 0) {
      answer.value = answer.value.substring(0, length-1);
    }
  }
  var equals = document.getElementById('btnback');
  equals.addEventListener('click', backClicked, false);
}

function setupEquals() {
  function equalsClicked() {
    checkAnswer();
    refresh();
  }
  var equals = document.getElementById('btneq');
  equals.addEventListener('click', equalsClicked, false);
}

function setupNumberButton(num) {
  var answer = document.getElementById('answer');
  var elem = document.getElementById('btn'+num);
  elem.addEventListener('click', function() {
    answer.value += num;
    console.log('clicked '+num);
  }, false);
}

function setup() {
  console.log('setup');
  setupEquals();
  setupBackspace();
  for(var i=0; i<10; i++) {
    setupNumberButton(i);
  }
  refresh();
}

window.addEventListener('load', setup, false);
