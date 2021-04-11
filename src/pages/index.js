import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown/with-html'

import SEO from '@/components/SEO/Seo'
import Layout from '@/components/Layout'

import Logo from '@/icons/Logo'

const HomePageTemplate = ({ data }) => {
  return (
    <>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='container px-5 sm:px-10'>
          <section className='w-full bg-teal-100 py-20 px-5 rounded-lg shadow border-grey-lighter border'>
            <div className='text-center mx-auto'>
              <div className='logo'>
                <Logo />
              </div>
              <p className='text-xs mt-2'>{data.version}</p>
            </div>
            <ReactMarkdown
              children={data.description}
              className='text-center mt-6'
              allowDangerousHtml
            />
            {data.links.length > 0 ? (
              <div className='flex justify-center flex-wrap items-center mt-6'>
                {data.links.map(({ link }, i) => {
                  return (
                    <a
                      href={link.url}
                      key={i}
                      target='_blank'
                      rel='noreferrer'
                      className='text-sm m-2'>
                      {link.content}
                    </a>
                  )
                })}
              </div>
            ) : (
              ''
            )}
          </section>
        </div>
      </div>
    </>
  )
}

const HomePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <SEO data={frontmatter.seo} />
      <HomePageTemplate data={frontmatter} />
    </Layout>
  )
}

HomePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export const pageQuery = graphql`
  query HomePageTemplate {
    markdownRemark(frontmatter: { template: { eq: "index" } }) {
      frontmatter {
        title
        version
        description
        links {
          link {
            content
            url
          }
        }
        ...SEO
      }
    }
  }
`

export default HomePage
