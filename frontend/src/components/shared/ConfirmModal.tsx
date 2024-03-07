type ModalConfirmProps = {
    title?: string,
    message?: string,
    onConfirm?: () => void,
    onClose?: (value: string | undefined) => void,
}
export const ModalConfirm: React.FC<ModalConfirmProps>= ({
    title = '', message = '', onConfirm = () => {} , onClose = () => {},
}) => {
    return(
        <section className='fixed z-10 top-0 left-0 flex min-w-[100vw] min-h-[100vh] bg-[#00000030] p-2'>
            <article className='  flex flex-col w-[100%] max-h-[75vh] m-auto bg-white p-6 border gap-2 rounded-lg max-w-[600px]'>
                <h2 className='text-xl'>{title}</h2>
                <p className='text-base mt-3'>{message}</p>

                <div className="w-[100%] mt-3 text-center">
                    <button
                    className='border border-[red]  rounded-3xl p-2 font-bold text-center w-[40%] mr-1'
                    type='button'
                    onClick={() => onClose(undefined)}
                    >
                    Cancelar
                    </button>
                    <button
                    className='border rounded-3xl p-2 font-bold bg-[red] text-center w-[40%] ml-1 text-white'
                    type='button'
                    onClick={onConfirm}
                    >
                    Aceptar
                    </button>
                </div>
            </article>
        </section>
    )
}