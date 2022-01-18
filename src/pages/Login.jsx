import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoginToken } from '../action/thunk';
import { setTokenLocalStorage } from '../server';
import { setPlayer } from '../action';
import logo from '../trivia.png';
import ConfigTrivia from '../componentes/ConfigTrivia';
import ConfigInfo from '../componentes/ConfigInfo';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      gravatarEmail: '',
      showConfig: false,
    };
  }

  componentDidMount() {
    // const { dispatch } = this.props;

    // dispatch(setLoginToken());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  checkButton = () => {
    const { nome, gravatarEmail } = this.state;

    // const regex = /\S+@\S+\.\S+/;
    // const validEmail = regex.test(email);
    // console.log(validEmail);

    if (gravatarEmail && nome) {
      return false;
    }

    return true;
  }

  getApiToken = async () => {
    const { history, dispatch } = this.props;

    await dispatch(setLoginToken());
    this.setLocalStore();

    history.push('/triviahome');
  }

  setLocalStore = () => {
    const { token } = this.props;

    setTokenLocalStorage(token);
  }

   renderConfig = () => {
     const { showConfig } = this.state;
     const toggle = showConfig;
     this.setState({ showConfig: !toggle });
   }

   render() {
     const { nome, gravatarEmail, showConfig } = this.state;
     const { dispatch } = this.props;

     return (
       <div
         className="h-screen w-screen flex justify-center items-center
        bg-gradient-to-r from-gray-800 to-gray-900"
       >
         <div
           className="bg-gray-100 w-4/5 h-4/5 flex flex-row justify-center
          shadow-2xl shadow-gray-900"
         >
           <div
             className="w-2/5 px-8 py-8 h-full"
           >
             <h2 className="font-bold">SIGN IN</h2>
             <label
               htmlFor="nameUser"
               className="block text-gray-500 font-bold mb-1 md:mb-0 mt-16"
             >
               Nome:
               <input
                 id="nameUser"
                 type="text"
                 name="nome"
                 value={ nome }
                 onChange={ this.handleChange }
                 data-testid="input-player-name"
                 className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600
                relative bg-white bg-white rounded text-sm border-0 shadow
                outline-none focus:outline-none focus:ring w-full"
               />
             </label>
             <label
               htmlFor="emailUser"
               className="block text-gray-500 font-bold mb-1 md:mb-0 mt-8"
             >
               Email:
               <input
                 id="emailUser"
                 type="text"
                 name="gravatarEmail"
                 value={ gravatarEmail }
                 onChange={ this.handleChange }
                 data-testid="input-gravatar-email"
                 className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600
                relative bg-white bg-white rounded text-sm border-0 shadow
                outline-none focus:outline-none focus:ring w-full"
               />
             </label>
             <button
               className="w-full mt-5 text-white bg-gradient-to-r from-purple-500
              via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4
              focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg
              shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80
              font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
               type="button"
               onClick={ () => { dispatch(setPlayer(this.state)); this.getApiToken(); } }
               data-testid="btn-play"
               disabled={ this.checkButton() }
             >
               Play
             </button>
             <button
               className="w-full mt-5 text-yellow-400 hover:text-white border
              border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300
              font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2
              dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white
              dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
               type="button"
               onClick={ () => this.renderConfig() }
               data-testid="btn-settings"
             >
               Config
             </button>
           </div>
           <div className="flex w-3/5 bg-neutral-700">
             <img
               src={ logo }
               alt="trivia-logo"
               className="bg-center bg-no-repeat bg-auto"
             />
           </div>

           {(showConfig) && <ConfigTrivia />}
           {(!showConfig) && <ConfigInfo />}

         </div>
       </div>
     );
   }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Login);
