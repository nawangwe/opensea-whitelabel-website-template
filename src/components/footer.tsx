import React from 'react'
import {useStyletron} from 'baseui'
import {BEHAVIOR, Cell, Grid} from 'baseui/layout-grid'
import {FaTwitter} from 'react-icons/fa'
import {FaInstagram} from 'react-icons/fa'
import {FaGithub} from 'react-icons/fa'
import {LabelSmall} from 'baseui/typography'

function Footer ({size}) {
  const [css, theme] = useStyletron()
  return (
    <div
      className={css({
        backgroundColor: theme.colors.primaryB,
        width: 100,
        paddingTop: theme.sizing.scale800,
        paddingBottom: theme.sizing.scale800,
        boxShadow: 'rgb(0 0 0 / 8%) 0px -1px 0px',
      })}
    >
      <Grid
        behavior={BEHAVIOR.fixed}
        gridGaps={20}
        gridColumns={[6, 6, 12, 12]}
      >
        <Cell
          span={6}
          overrides={{
            Cell: {
              style: {
                display: 'flex !important',
                flexDirection: 'column',
                alignItems: size.width <= 1136 ? 'center' : 'flex-start',
              },
            },
          }}
        >
          <LabelSmall className={css({color: theme.colors.contentPrimary})}>
            {process.env.NEXT_PUBLIC_COPYRIGHT_TEXT}
          </LabelSmall>
          <div style={{marginTop: 10}}>
            { process.env.NEXT_PUBLIC_TWITTER && process.env.NEXT_PUBLIC_TWITTER != "" &&
            <a href={`${process.env.NEXT_PUBLIC_TWITTER}`} target='_blank'>
              <FaTwitter
                style={{width: 30, height: 30}}
                color={theme.colors.contentPrimary}
              />
            </a>
            }
            { process.env.NEXT_PUBLIC_INSTAGRAM && process.env.NEXT_PUBLIC_INSTAGRAM != "" &&
            <a href={`${process.env.NEXT_PUBLIC_INSTAGRAM}`} target='_blank'>
              <FaInstagram
                href={process.env.NEXT_PUBLIC_INSTAGRAM}
                style={{width: 30, height: 30, marginLeft: 10}}
                color={theme.colors.contentPrimary}
              />
            </a>}
            { process.env.NEXT_PUBLIC_GITHUB && process.env.NEXT_PUBLIC_GITHUB != "" &&
              <a href={`${process.env.NEXT_PUBLIC_GITHUB}`} target='_blank'>
              <FaGithub
                style={{width: 30, height: 30, marginLeft: 10}}
                color={theme.colors.contentPrimary}
              />
            </a>}
          </div>
        </Cell>
        <Cell
          span={6}
          overrides={{
            Cell: {
              style: {
                display: 'flex !important',
                flexDirection: 'column',
                alignItems: size.width <= 1136 ? 'center' : 'flex-end',
              },
            },
          }}
        >
          <LabelSmall className={css({color: theme.colors.contentPrimary})}>
            Created with OpenSea whitelable template
          </LabelSmall>
          <div style={{marginTop: 10}} />
          <a
            href='https://github.com/nawangwe/opensea-whitelabel-website-template'
            target='_blank'
          >
            <FaGithub
              style={{width: 30, height: 30}}
              color={theme.colors.contentPrimary}
            />
          </a>
        </Cell>
      </Grid>
    </div>
  )
}

export default Footer
