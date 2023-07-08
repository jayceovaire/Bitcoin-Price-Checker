

export default function layouts({children}: any) {
    return (
        <>
        <div>
            <nav class="bg-gray-900">
                <a href="/">Refresh</a>
            </nav>
            {children}
        </div>
        </>
    )
}