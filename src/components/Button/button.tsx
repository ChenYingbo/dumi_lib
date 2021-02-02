import React from 'react'
import classnames from 'classnames'
import './_style.less'

export enum ButtonSize{
  Larget = 'lg',
  Small = 'sm'
}

export enum ButtonType{
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

interface BaseButtonProps{
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children?: React.ReactNode;
  href?:string;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>


const Button: React.FC<ButtonProps> = (props) => {
  const {btnType, disabled, size, children, href, className, ...restProps} = props

  const classes = classnames('btn',className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disables': (btnType === ButtonType.Link) && disabled
  })

  if(btnType === ButtonType.Link && href){
    return (
    <a
      className={classes}
      href={href}
      {...restProps}
    >{children}</a>
    )
  }else{
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }

}

Button.defaultProps={
  btnType: ButtonType.Default,
  disabled: false
}

export default Button
