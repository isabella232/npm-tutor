"use strict"

module.exports = function Sequence(exercises, data) {
  if (!exercises) throw new Error('Sequence needs exercises: ' + exercises)
  return {
    getCurrent: getCurrent,
    setCurrent: setCurrent,
    getNext: getNext,
    getPrev: getPrev,
    setNext: setNext,
    setPrev: setPrev,
    getComplete: getComplete,
    setComplete: setComplete,
    unsetComplete: unsetComplete,
    complete: setComplete,
    isComplete: isComplete,
    allComplete: allComplete,
    incomplete: incomplete,
    data: data,
    exercises: exercises
  }

  function setCurrent(exerciseName) {
    return exercises[data.set('current', exerciseName)]
  }

  function getCurrent() {
    return exercises[data.get('current', exercises[0].name)]
  }

  function getNext() {
    var current = getCurrent()
    var next = exercises[current.sequence + 1]
    return (next) ? next : current
  }

  function getPrev() {
    var current = getCurrent()
    var prev = exercises[current.sequence - 1]
    return (prev) ? prev : current
  }

  function setNext() {
    return setCurrent(getNext().name)
  }

  function setPrev() {
    return setCurrent(getPrev().name)
  }

  function getComplete() {
    return data.get('completed', [])
  }

  function setComplete(name) {
    return data.set('completed', function(completed) {
      completed = completed || []
      return completed.concat(name).filter(uniq)
    })
  }

  function unsetComplete(name) {
    return data.set('completed', function(completed) {
      completed = completed || []
      return completed.filter(function(complete) {
        return complete !== name
      })
    })
  }

  function isComplete(name) {
    return getComplete().indexOf(name) !== -1
  }

  function allComplete(name) {
    return getComplete().length === exercises.length
  }

  function incomplete() {
    var completed = getComplete()
    return [].filter.call(exercises, function(exercise) {
      return completed.indexOf(exercise.name) === -1
    })
  }
}

function uniq(name, index, arr) {
  return index === arr.lastIndexOf(name)
}