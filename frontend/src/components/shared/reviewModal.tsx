import React, { useState } from 'react';

type ModalConfirmProps = {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
    handlePostReview: (rating: number) => void
}

export const ReviewModal: React.FC<ModalConfirmProps> = ({ setOpenModal, handlePostReview }) => {
    const [rating, setRating] = useState<number>(0);

    const handleStarClick = (starNumber: number) => {
        setRating(starNumber);
    };

    return (
        <section className='fixed z-10 top-0 left-0 flex min-w-[100vw] min-h-[100vh] bg-[#00000030] p-2'>
            <article className='  flex flex-col justify-around w-[328px] h-[304px] max-h-[75vh] m-auto bg-white p-6 border gap-1 rounded-lg max-w-[600px]'>
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl "> VALORACIÓN</h1>
                    <h3 className="text-base" >Por favor, valora el establecimiento</h3>
                </div>
                <div className="flex justify-around">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <img
                            key={star}
                            className="h-12 cursor-pointer"
                            src={`/images/estrella${star <= rating ? 'Llena' : 'Vacia'}Black.svg`}
                            alt={`Estrella ${star}`}
                            onClick={() => handleStarClick(star)}
                        />
                    ))}
                </div>
                <div className="flex flex-col gap-2">
                    <button onClick={() => {
                        handlePostReview(rating)
                        setOpenModal(false)
                    }} className="px-3 py-1 font-semibold rounded-3xl w-full border bg-[#D58418] text-center">
                        Aceptar
                    </button>
                    <button onClick={() => setOpenModal(false)} className="px-3 py-1 font-semibold rounded-3xl w-full border-[2px] border-[#D58418] bg-white text-center">
                        Cancelar
                    </button>
                </div>
            </article>
        </section>
    )
}
