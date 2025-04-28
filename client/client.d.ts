export {}
import type { AxiosResponse } from 'axios'
import React from 'react'

declare global {
  export interface IButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'content'>,
      React.RefAttributes<HTMLButtonElement> {
    isInverted?: boolean
    isStatic?: boolean
    isPressed?: boolean
    width: number | string
    height: number | string
    style?: React.CSSProperties
    content?: string | React.ReactNode
  }

  export interface IInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'content'>,
      React.RefAttributes<HTMLInputElement> {
    includeSpaces?: boolean
    height: number | string
    style?: React.CSSProperties
    content?: string | React.ReactNode
  }

  export interface IArticleFrontProps {
    title: string
    subtitle: string
    content: string
  }

  export interface IArticleBackProps {
    data: IArticle
  }

  export interface IAuthFormProps {
    formTitle: string
    btnText?: string
    btnLink?: string
    onSubmit: (...args) => void
    err: AxiosResponse
  }

  export interface IArticleFormProps {
    formTitle: string
    defaultTitle?: string
    defaultSubtitle?: string
    defaultContent?: string
    onSubmit: (...args) => void
  }

  export interface IMarkdownEditorProps {
    value: string
    onChange: (...args) => void
  }

  export interface IMarkdownPreviewProps {
    source: string
    className: string
  }

  export interface IUserData {
    user_id: number
    username: string
    is_admin: boolean
  }

  export interface IAuthContext {
    accessToken: string | undefined
    refreshToken: string | undefined
    setCookie: (...args) => void | undefined
    removeCookie: (...args) => void | undefined
    setAccessToken: (accessToken: string) => void | undefined
    setRefreshToken: (refreshToken: string) => void | undefined
    setUserData: (userData: IUserData) => void | undefined
    userData: IUserData | undefined
  }

  export interface IAdminContext {
    admin: boolean | undefined
    setAdmin: (admin: boolean) => void | undefined
  }
}
