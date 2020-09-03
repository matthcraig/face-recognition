import React from 'react';

const Register = ({ onRouteChange }) => {
  return (
<article className="br3 ba b--black-10 shadow-5 mv4 w-100 w-50-m w-25-l mw6 center">
  <main className="pa4 black-80">
    <form className="measure">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
        <legend className="f4 fw6 ph0 mh0">Register Below</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" for="name">Name</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" for="email">Email</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email"  id="email" />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" for="password">Password</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" />
          </div>
        <label className="pa0 ma0 lh-copy f6 pointer" />
      </fieldset>
      <div className="">
        <input 
        onClick={() => onRouteChange('home')}
        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" 
        value="Register" 
        />
      </div>
    </form>
  </main>
</article>
  )
}
export default Register