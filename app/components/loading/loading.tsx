import styles from './loading.module.css';

export default function Loading() {
    return (
        <div className="fixed left-0 top-[88px] w-screen flex flex-col items-center justify-center bg-white z-50" style={{
            height: "calc(100vh - 88px)"
        }}>
            <div className={styles.book + " mb-8"}>
                <div className={styles.book__pg_shadow}></div>
                <div className={styles.book__pg}></div>
                <div className={styles.book__pg + " " + styles.book__pg__2}></div>
                <div className={styles.book__pg + " " + styles.book__pg__3}></div>
                <div className={styles.book__pg + " " + styles.book__pg__4}></div >
                <div className={styles.book__pg + " " + styles.book__pg__5}></div>
            </div >
            <p className="text-4xl text-center leading-relaxed">Synthesizing sources...</p>
        </div >
    );
}