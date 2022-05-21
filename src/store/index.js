import { createStore } from 'vuex'

function getAvatar( user ) {
  return user.avatar ?
    `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${user.avatar.startsWith( 'a_' ) ? 'gif' : 'png'}` :
    `https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png`;
}

export default createStore({
  state: {
		/**
		 * @property { string } id
		 * @property { string } discriminator
		 * @property { string } email
		 * @property { number } flags
		 * @property { string } locale
		 * @property { boolean } mfa_enabled
		 * @property { number } premium_type
		 * @property { number } public_flags
		 * @property { string } username
		 * @property { boolean } verified
		 * @property { string } token
		 */
		user: JSON.parse( localStorage.getItem( 'user' ) )
    // user: {
    //   id: '781885598524768296',
    //   username: 'Who',
    //   discriminator: '1488',
    //   avatar: 'a_7b4eb459fff03734ceef4765b204f584',
    //   email: '',
    //   flags: 0,
    //   locale: '',
    //   mfa_enabled: false,
    //   premium_type: 0,
    //   public_flags: 0,
    //   verified: false,
    //   token: ''
    // }
	},
	mutations: {
		auth_request( state ) {
			state.status = 'loading';
		},
		auth_success( state, user ) {
			state.status = 'success';
			state.user = user;
		},
		auth_error( state ) {
			state.status = 'error';
		},
		token( state, token ) {
			state.user.token = token;
		},
		logout( state ) {
			state.user = undefined;
			localStorage.removeItem( 'user' );
		}
	},
	actions: {
		async auth( { commit }, token ) {
			if ( this.user ) { return commit( 'auth_error' ); }
			commit( 'auth_request' );
			try {
				const res = await fetch( 'https://discord.com/api/v10/users/@me', { headers: { Authorization: `Bearer ${token}` }, method: 'get' } );
				if ( !res.ok ) { return commit( 'auth_error' ); }
				const data = await res.json();
				data.token = token;
				commit( 'auth_success', data );
				localStorage.setItem( 'user', JSON.stringify( data ) );
			} catch ( e ) {
				commit( 'auth_error' );
			}
		},
		logout( { commit } ) {
			localStorage.removeItem( 'user' );
      location.reload();
			commit( 'logout' );
		}
	},
	modules: {},
	getters: {
		avatar: state => state.user ?
			getAvatar( state.user ) :
			'',
		user: state => state.user
	}
})