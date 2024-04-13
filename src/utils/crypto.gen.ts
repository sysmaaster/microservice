import crypto from 'crypto'
import ErrorException from '../exceptions/error.exception';
import log from '../services/logger';

/**
 * functiion generic rendon string
 * @returns random
 */
const getCrypto = ()=>{
    try { const id = crypto.randomBytes(12).toString('hex'); 
    return id }    
    catch{ log.error("RandomGen - some wrong") ; getCrypto()}
}
export default getCrypto