import './Data.css';

const Data = (props) => {
    return (
        <section className={`data data_${props.type}`}>
            <div className={`data__container data__container_${props.type}`}>
                <h2 className="data__title">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    {<a id={props.linkId} name={props.linkId} className="data__link">{props.content}</a>}
                    {props.title}
                </h2>
                {props.children}
            </div>
        </section>
    );
};

export default Data;
