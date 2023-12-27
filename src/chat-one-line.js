export default (node) => {
    if (!node.hasAttribute('user_id')) {
        return
    }
    node.style.display = 'flex'
}
