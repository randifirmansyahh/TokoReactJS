import { useForm } from 'react-hook-form'
import { AuthContext } from 'contexts/AuthContext'
import { useContext } from 'react'
import './components/styles/styleAll.css'

export default function Login() {
  const { signIn } = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    await signIn(data)
  }

  return (
    <>
      <div className="mt-5">
        <div className="container-tight pt-0 pb-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card card-md"
            action="."
            method="get"
            autoComplete="off"
          >
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                Login to your account
              </h2>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter email"
                  {...register('email', { required: 'harus diisi' })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>
              <div className="mb-2">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? 'is-invalid' : ''
                  }`}
                  placeholder="Password"
                  autoComplete="off"
                  {...register('password', { required: 'harus diisi' })}
                />
                {errors.password && (
                  <div className="invalid-feedback">
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className="form-footer">
                <button
                  type="submit"
                  className="btn btn-dark w-100 btn-hover zoom"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                    <path d="M20 12h-13l3 -3m0 6l-3 -3" />
                  </svg>
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
