import Container from '@/components/atoms/Container'
import Text from '@/components/atoms/Inputs/Text'
import RichText from '@/components/atoms/RichText'
import Layout from '@/components/common/Layout'
import Form from '@/components/molecules/Form'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import {signIn, useSession} from 'next-auth/react'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'

/**
 * Render the Register component.
 *
 * @author WebDevStudios
 * @param  {object}  props      The component attributes as props.
 * @param  {object}  props.post Post data from WordPress.
 * @return {Element}            The Register component.
 */
export default function Register({post}) {
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
   * Submit registration form.
   *
   * @author WebDevStudios
   * @param {object} values Field values to submit.
   */
  async function submitForm(values) {
    const {firstName, lastName, email, password, username} = values
    const response = await signIn('wpRegister', {
      firstName,
      lastName,
      email,
      password,
      username,
      redirect: false
    })

    if (response.error) {
      setErrorMessage(response.error)
    }
  }

  return (
    <Layout seo={{...post?.seo}}>
      <Container>
        <RichText tag="h1">Register</RichText>
        {!!errorMessage && <div>{errorMessage}</div>}
        <Form
          className="registration-form"
          id="registration-form"
          title="Register"
          formDefaults={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            username: ''
          }}
          onSubmit={submitForm}
        >
          <Text id="firstName" label="First Name" isRequired type="text" />
          <Text id="lastName" label="Last Name" isRequired type="text" />
          <Text id="email" label="Email" isRequired type="email" />
          <Text id="username" label="username" isRequired type="text" />
          <Text id="password" label="password" isRequired type="password" />
        </Form>
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
  return await getPostTypeStaticProps(null, 'register')
}
