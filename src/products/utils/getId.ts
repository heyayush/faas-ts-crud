import { v4 as uuidv4 } from 'uuid'

const getId = () => `faas-${uuidv4()}`

export default getId
