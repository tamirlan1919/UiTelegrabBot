// ParentComponent.jsx
import Voices from '../voices/Voices';

const ParentComponent = ({ user_id, tg }) => {
    const speed = 1.0;
    const format = 'mp3';

    return (
        <div>
            <Voices user_id={user_id} tg={tg} speed={speed} format={format} />
        </div>
    );
};

export default ParentComponent;
