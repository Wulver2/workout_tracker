import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
import ListExercises from "../components/ListExercises";

export function Exercises() {
  return (
    <Fragment>
       <ListExercises  />
    </Fragment>
  );
}