import * as React from 'react'
import { IPersonal } from 'scripts/ducks/models/AppModel'

interface IProps {
  personal: IPersonal
}

const PersonalItem: React.SFC<IProps> = ({ personal }) => {
  return (
    <li>
      <p>name : {personal.name}</p>
      <p>sex : {personal.sex}</p>
      <p>age : {personal.age}</p>
    </li>
  )
}

export default PersonalItem
