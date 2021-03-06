<?php
 /**
 * block_registercontext class for Chisimba
 * 
 * A block class to produce a registration block.
 * 
 * PHP version 5
 *  
 * This program is free software; you can redistribute it and/or modify 
 * it under the terms of the GNU General Public License as published by 
 * the Free Software Foundation; either version 2 of the License, or 
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful, 
 * but WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License 
 * along with this program; if not, write to the 
 * Free Software Foundation, Inc., 
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 * 
 * 
 * @category  Chisimba
 * @package   security
 * @author Nic Appleby
 * @copyright 2004-2007, University of the Western Cape & AVOIR Project
 * @license   http://www.gnu.org/licenses/gpl-2.0.txt The GNU General Public License 
 * @version   $Id$
 * @link      http://avoir.uwc.ac.za
 */
// security check - must be included in all scripts
if (!$GLOBALS['kewl_entry_point_run'])
{
    die("You cannot view this page directly");
}
// end security check

/**
* 
* A block class to produce a registration block
*
* @author Nic Appleby
* 
* $Id$
*
*/
class block_registercontext extends object
{
    /**
    * @var string $title The title of the block
    */
    public $title;
    
    /**
    * @var object $objLanguage String to hold the language object
    */
    private $objLanguage;

    /**
    * Standard init function to instantiate language object
    * and create title, etc
    */
    public function init()
    {
        try {
            $this->objLanguage =  $this->getObject('language', 'language');
            $this->objUser = $this->getObject('user', 'security');
              $this->title = $this->objLanguage->languageText("word_registration");

        } catch (customException $e) {
        customException::cleanUp();
        }
    }
    
    /**
    * Standard block show method. It uses the renderform
    * class to render the login box
    */
    public function show()
    {
        try {
                $regLink = $this->newObject('link','htmlelements');
                $regLink->link = $this->objLanguage->languageText('word_register');
                $regLink->link($this->uri(NULL,'userregistration'));
                return $regLink->show();
       } catch (customException $e) {
            customException::cleanUp();
        }
    }
}
?>
