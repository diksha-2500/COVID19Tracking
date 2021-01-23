import React from 'react'
import { Link } from 'gatsby'

import { isCombined } from './utils'
import Percent from '~components/pages/race/dashboard/percent'
import { FormatDate } from '~components/utils/format'

import RacialDataSmallCard from '~components/pages/data/cards/small/view-racial-data-small-card'
import DataAsGraphicSmallCard from '~components/pages/data/cards/small/data-as-graphic-small-card'

import styles from './notes-and-downloads.module.scss'

const getDataCompletenessNote = (combined, separate) => {
  /**
   * Generates a note about data completeness for this state.
   */
  const stateIsCombined = isCombined(combined, separate)
  const dataObject = stateIsCombined ? combined[0] : separate[0]

  if (stateIsCombined) {
    return (
      <>
        As of{' '}
        <FormatDate
          date={dataObject.lastCheckDate.value}
          format="LLLL d, yyyy"
        />
        , {dataObject.name} has reported race/ethnicity data for{' '}
        <Percent number={parseFloat(dataObject.knownRaceEthPos)} /> of cases and{' '}
        <Percent number={parseFloat(dataObject.knownRaceEthDeath)} /> of deaths.
      </>
    )
  }
  if (!stateIsCombined) {
    return (
      <>
        As of{' '}
        <FormatDate
          date={dataObject.lastCheckDate.value}
          format="LLLL d, yyyy"
        />
        , {dataObject.name} has reported race data for{' '}
        <Percent number={parseFloat(dataObject.knownRacePos)} /> of cases and{' '}
        <Percent number={parseFloat(dataObject.knownRaceDeath)} /> of deaths,
        and ethnicity for{' '}
        <Percent number={parseFloat(dataObject.knownEthPos)} /> of cases and{' '}
        <Percent number={parseFloat(dataObject.knownEthDeath)} /> of deaths.
      </>
    )
  }
  return ''
}

const getNotes = (combined, separate) => {
  /**
   * Creates a list of notes for this state's data.
   */
  const notesObject = isCombined(combined, separate) ? combined[0] : separate[0]
  const notesList = Object.keys(notesObject)
    .map(note => {
      if (note !== null && note.includes('Note')) {
        return notesObject[note]
      }
      return null
    })
    .filter(
      noteContent => noteContent != null && typeof noteContent === 'string',
    )
  notesList.unshift(getDataCompletenessNote(combined, separate))
  return notesList
}

const NotesAndDownloads = ({
  slug,
  stateAbbreviation,
  stateName,
  combinedData,
  separateData,
}) => {
  const notesList = getNotes(combinedData, separateData)

  return (
    <div className={styles.container}>
      <div className={styles.notes}>
        <h4>Notes</h4>
        <ol>
          {notesList.map(note => (
            <li key={note}>{note}</li>
          ))}
        </ol>
      </div>
      <div className={styles.downloadsContainer}>
        <h4>Download dataset</h4>
        <div className={styles.links}>
          {/** todo update the href to the state's crdt csv */}
          <a
            href={`#${slug}`}
            aria-label={`Download ${stateName}'s racial data data as CSV`}
          >
            CSV
          </a>
          {/** todo update the href to the state's metadata */}
          <Link to="/data/api" aria-label={`Download ${stateName}'s Metadata`}>
            Metadata
          </Link>
        </div>
        <div className={styles.smallCards}>
          <RacialDataSmallCard
            stateAbbreviation={stateAbbreviation}
            stateName={stateName}
            content="View racial data dashboard"
          />
          <DataAsGraphicSmallCard
            stateAbbreviation={stateAbbreviation}
            stateName={stateName}
          />
        </div>
      </div>
    </div>
  )
}

export default NotesAndDownloads
