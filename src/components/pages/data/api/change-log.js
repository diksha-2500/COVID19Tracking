import React from 'react'
import changeLogStyle from './change-log.module.scss'

const ChangeLog = () => (
  <>
    <div className={changeLogStyle.changeLog}>
      <ul>
        <li>
          <a
            href="https://apichanges.covidtracking.com/"
            target="_blank"
            rel="noreferrer"
          >
            Latest changes
            <span aria-hidden />
          </a>
        </li>
        <li>
          <a
            href="https://covidtrackingproject.statuspage.io/"
            target="_blank"
            rel="noreferrer"
          >
            Status page
            <span aria-hidden />
          </a>
        </li>
      </ul>
    </div>
  </>
)

export default ChangeLog
