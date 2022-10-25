import Container from '@/components/atoms/Container'
import Text from '@/components/atoms/Inputs/Text'
import RichText from '@/components/atoms/RichText'
import Layout from '@/components/common/Layout'
import Form from '@/components/molecules/Form'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import {signIn, useSession} from 'next-auth/react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'

/**
 * Render the Login component.
 *
 * @author WebDevStudios
 * @param  {object}  props      The component attributes as props.
 * @param  {object}  props.post Post data from WordPress.
 * @return {Element}            The Login component.
 */
export default function Login({post}) {
  const [errorMessage, setErrorMessage] = useState('')
  const {data: session} = useSession()
  const router = useRouter()

  // Redirect to Profile page if user already logged in.
  useEffect(() => {
    if (session && session.user) {
      router.push('/profile')
    }
  })

  /**
   * Submit login form.
   *
   * @author WebDevStudios
   * @param {object} values Field values to submit.
   */
  async function submitForm(values) {
    const {username, password} = values
    const response = await signIn('wpLogin', {
      username,
      password,
      redirect: false
    })

    if (response.error) {
      setErrorMessage(response.error)
    }
  }

  return (
    <Layout seo={{...post?.seo}}>
      <Container>
        <RichText tag="h1">Login</RichText>
        {!!errorMessage && <div>{errorMessage}</div>}
        <Form
          className="login-form"
          id="login-form"
          title="Login"
          formDefaults={{
            username: '',
            password: ''
          }}
          onSubmit={submitForm}
        >
          <Text id="username" label="Username" isRequired type="text" />
          <Text id="password" label="Password" isRequired type="password" />
        </Form>
        <Link href="/register">
          <a>Create an Account</a>
        </Link>
      </Container>
    </Layout>
  )
}

/**
 * Get post static props.
 *
 * @author WebDevStudios
 * @return {object} Post props.
 */
export async function getStaticProps() {
  return await getPostTypeStaticProps(null, 'login')
}
