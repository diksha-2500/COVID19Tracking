import React, { useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@reach/disclosure'
import explorerStyles from './explorer.module.scss'
import ApiV2Conversion from './v2-conversion'

const Endpoint = ({ endpoint }) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    title,
    description,
    path,
    sample,
    simplePath,
    simpleSample,
  } = endpoint
  const samplePath = `https://api.covidtracking.com${
    typeof sample !== 'undefined' ? sample : path
  }`
  const sampleSimplePath =
    simplePath &&
    `https://api.covidtracking.com${
      typeof simpleSample !== 'undefined' ? simpleSample : simplePath
    }`
  return (
    <Disclosure onChange={() => setIsOpen(!isOpen)}>
      <DisclosureButton className={explorerStyles.button}>
        <h3>
          {title}{' '}
          <span aria-hidden className={explorerStyles.toggle}>
            {isOpen ? <>↑</> : <>↓</>}
          </span>
        </h3>
      </DisclosureButton>
      <DisclosurePanel className={explorerStyles.panel}>
        <p className={explorerStyles.pathDescription}>{description}</p>
        <p className={explorerStyles.pathDescription}>
          <strong>URL path:</strong>
          <code>{path}</code>
        </p>
        <p className={explorerStyles.pathDescription}>
          <strong>Example:</strong>{' '}
          <a
            className={explorerStyles.pathExample}
            target="_blank"
            rel="noreferrer"
            href={samplePath}
          >
            {samplePath}
            <span aria-hidden />
          </a>
        </p>
        {simplePath && (
          <>
            <p className={explorerStyles.pathDescription}>
              <code>Simplified data:{path}</code>
            </p>
            <p className={explorerStyles.pathDescription}>
              <strong>Simplified data example:</strong>{' '}
              <a
                className={explorerStyles.pathExample}
                target="_blank"
                rel="noreferrer"
                href={sampleSimplePath}
              >
                {sampleSimplePath}
                <span aria-hidden />
              </a>
            </p>
          </>
        )}
      </DisclosurePanel>
    </Disclosure>
  )
}

const Section = ({ title, endpoints }) => (
  <>
    <h2>{title}</h2>
    {endpoints.map(endpoint => (
      <Endpoint endpoint={endpoint} />
    ))}
  </>
)

const ApiExplorer2 = () => {
  const [crosswalkOpen, setCrosswalkOpen] = useState(false)
  return (
    <>
      <Disclosure onChange={() => setCrosswalkOpen(!crosswalkOpen)}>
        <DisclosureButton className={explorerStyles.button}>
          <h3>
            Convert fields from v1 to v2
            <span aria-hidden className={explorerStyles.toggle}>
              {crosswalkOpen ? <>↑</> : <>↓</>}
            </span>
          </h3>
        </DisclosureButton>
        <DisclosurePanel className={explorerStyles.panel}>
          <ApiV2Conversion />
        </DisclosurePanel>
      </Disclosure>
      <Section
        title="National Data"
        endpoints={[
          {
            title: 'Historic US values',
            description: 'All COVID data for the US.',
            path: '/v2/us/daily.json',
          },
          {
            title: 'Single day of data',
            description: 'One day of data for the US.',
            path: '/v2/us/daily/[date-iso-format].json',
            sample: '/v2/us/daily/2021-01-02.json',
            simplePath: '/v2/us/daily/[date-iso-format]/simple.json',
            simpleSample: '/v2/us/daily/2021-01-02/simple.json',
          },
        ]}
      />
      <Section
        title="State &amp; Territories Data"
        endpoints={[
          {
            title: 'All state metadata',
            description:
              'Basic information about all states, including notes about our methodology and the websites we use to check for data.',
            path: '/v2/states.json',
          },
          {
            title: 'Single state metadata',
            description:
              'Basic information about all states, including notes about our methodology and the websites we use to check for data.',
            path: '/v2/states/[state-code].json',
            sample: '/v2/states/mi.json',
          },
          {
            title: 'Historic data for a state or territory',
            description: 'All historic data for a single state',
            path: '/v2/states/[state-code]/daily.json',
            sample: '/v2/states/ca/daily.json',
            simplePath: '/v2/states/[state-code]/daily/simple.json',
            simpleSample: '/v2/states/ca/daily/simple.json',
          },
          {
            title: 'Single day of data for a state or territory',
            description: 'Returns data for a single day.',
            path: '/v2/states/[state-code]/[date-iso-format].json',
            sample: '/v2/states/ca/2021-01-10.json',
            simplePath: '/v2/states/[state-code]/[date-iso-format]/simple.json',
            simpleSample: '/v2/states/ca/2021-01-10/simple.json',
          },
        ]}
      />
    </>
  )
}

export default ApiExplorer2
