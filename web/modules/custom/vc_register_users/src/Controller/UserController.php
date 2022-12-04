<?php

namespace Drupal\vc_register_users\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * API to register user for particular covid center.
 */
class UserController extends ControllerBase {
    /**
     * Registers user 
    */
    public function registerUsers() {
        //Getting current user id and node id
        $node_id = \Drupal::request()->request->get('node_id');
        $user_id = \Drupal::request()->request->get('user_id');

        try {
            $node = \Drupal\node\Entity\Node::load($node_id);
            $no_of_slots = $node->get("field_no_of_vaccination_slots")->value;
            $remaining_slots = $no_of_slots - 1;
            $node->field_no_of_vaccination_slots->value = $remaining_slots;
            $node->get('field_registered_users')->appendItem(['target_id' => $user_id]);
            $node->save();
        } catch (\Exception $e) {
            // Handle general PHP exceptions.
            watchdog_exception('vc_register_user_save_user_api_error', $e);
        }

        $success_message = "User registered successfully";
        return new JsonResponse(array("result" => $success_message, "remaining_slots" => $node->field_no_of_vaccination_slots->value));
    }

    /**
     * Check if user already registered for particular center
     * Send 2 if regsitered for any other center
     * Send 1 if regisitered for the selected center
     * Send 0 if not registered for any center
    */
    public function checkUserRegister() {
        //Getting current user id and node id
        $node_id = \Drupal::request()->request->get('node_id');
        $user_id = \Drupal::request()->request->get('user_id');

        try {
            //Check if user is registered for any other center
            $query = \Drupal::database()->select('node_field_data', 'n');
            $query->condition('n.type', 'vaccination_center_details', '=')
                ->condition('n.status', '1', '=')
                ->fields('n', array('title'));
            $query->leftJoin('node__field_registered_users', 'n1', 'n1.entity_id = n.nid');
            $query->condition('n1.field_registered_users_target_id', $user_id);
            $result_other_center = $query->execute()->fetchAll();

            //Check if user is registered for this particular center
            $query = \Drupal::database()->select('node_field_data', 'n');
            $query->condition('n.type', 'vaccination_center_details', '=')
                ->condition('n.status', '1', '=')
                ->condition('n.nid', $node_id, '=')
                ->fields('n', array('title'));
            $query->leftJoin('node__field_registered_users', 'n1', 'n1.entity_id = n.nid');
            $query->condition('n1.field_registered_users_target_id', $user_id);
            $result_this_center = $query->execute()->fetchAll();

            //Send 1 for true, 0 for false.
            $status = 0;
            if(!empty($result_other_center) && empty($result_this_center)) {
                $status = 2;
            } elseif(!empty($result_this_center)) {
                $status = 1;
            }
        } catch (\Exception $e) {
            // Handle general PHP exceptions.
            watchdog_exception('vc_register_get_exisiting_data_api_error', $e);
        }

        return new JsonResponse(array("data" => $status));
    }
}