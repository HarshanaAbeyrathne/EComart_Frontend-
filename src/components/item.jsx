import React from "react";

function item({ title, description, price }) {
return (
    <div className="card bg-white w-76 shadow-xl">
            <figure className="px-10 pt-10">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt={title}
                    className="rounded-xl"
                />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <h2 className="text-red-600 text-2xl">{price}</h2>
                <div className="card-actions">
                    <button className="btn btn-accent">Buy Now</button>
                </div>
            </div>
        </div>
);
}

export default item;
