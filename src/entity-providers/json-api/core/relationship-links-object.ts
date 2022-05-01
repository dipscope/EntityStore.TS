import { LinkObject } from './link-object';
import { LinksObject } from './links-object';

/**
 * Represents relationship links.
 * 
 * @type {RelationshipsObject}
 */
export type RelationshipLinksObject = LinksObject &
{
    /**
     * Link for the relationship itself. This link allows the client to directly manipulate 
     * the relationship. For example, removing an author through an article’s relationship URL 
     * would disconnect the person from the article without deleting the people resource itself. 
     * When fetched successfully, this link returns the linkage for the related resources as 
     * its primary data.
     * 
     * @type {LinkObject}
     */
    self?: LinkObject;
    
    /**
     * Related resource link.
     * 
     * @type {LinkObject}
     */
    related?: LinkObject;
};
