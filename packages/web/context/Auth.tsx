import { useRouter } from 'next/router'
import React, { createContext, FC, useContext, useEffect } from 'react'
import { useMeQuery, User } from '../graphql'

export const Auth = createContext<User | null>(null)

export const AuthProvider: FC = ({ children }) => {
	const { data, loading, error } = useMeQuery()

	let user = !data?.me || loading || error ? null : data.me

	return <Auth.Provider value={user}>{children}</Auth.Provider>
}

export const useAuth = () => {
	const user = useContext(Auth)

	const router = useRouter()

	useEffect(() => {
		if (!user) {
			router.push('/user/login')
		}
	}, [user])
}
