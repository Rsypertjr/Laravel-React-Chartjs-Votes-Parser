<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\VoteRow;

class VoteRowController extends Controller
{
    public function vote_rows($state = null){

        //$state = 'Michigan';
        $url='https://static01.nyt.com/elections-assets/2020/data/api/2020-11-03/race-page/'.str_replace(' ','-',trim(strtolower($state))).'/president.json';
        
        VoteRow::truncate();
        $response = Http::get($url);
        if($response->successful()) { 
            $res = $response->body();
            $res = json_decode($res);
            $timeseries = $res->data->races[0]->timeseries;
            //echo json_encode($timeseries);
            foreach ($timeseries as $row){
                $vote_row = new VoteRow();
                $vote_row->votes = $row->votes;
                $search = array('T','Z');
                $replace = array(' ','');
                $vote_row->timestamp = str_replace($search,$replace,$row->timestamp);
                $vote_row->bidenj = $row->vote_shares->bidenj;
                $vote_row->biden_votes = 0;
                $vote_row->trumpd = $row->vote_shares->trumpd;
                $vote_row->trump_votes = 0;
                $vote_row->other_votes = 0;
                $vote_row->total_vote_add = 0;
                $vote_row->total_vote_add_trump = 0;
                $vote_row->total_vote_add_biden = 0;
                $vote_row->total_vote_add_other = 0;
                $vote_row->total_vote_add_total = 0;
                $vote_row->percent_of_remaining_trump = 0;
                $vote_row->percent_of_remaining_biden = 0;
                $vote_row->time = str_replace($search,$replace,$row->timestamp);
                $vote_row->save();
            };

            $vote_rows = VoteRow::all();
            //echo json_encode($vote_rows);
            //die();
            $index = 0;
            foreach ($vote_rows as $votes){
               
                if($index == 0){
                    $vote_row = new VoteRow(); 
                    $vote_row->exists = true;
                    $vote_row->id = $index + 1;
                    $vote_row->biden_votes = $votes->bidenj * $votes->votes;
                    $vote_row->trump_votes = $votes->trumpd * $votes->votes;
                    $vote_row->total_vote_add = $votes->votes;
                    $vote_row->total_vote_add_trump = $votes->votes * $votes->trumpd;
                    $vote_row->total_vote_add_biden = $votes->votes * $votes->bidenj;
                    $vote_row->total_vote_add_other = $votes->votes - ($votes->votes * $votes->trumpd + $votes->votes * $votes->bidenj);
                    $vote_row->other_votes = (1-$votes->bidenj - $votes->trumpd) * $votes->votes;
                    $vote_row->save();
                }
                else if($index > 0){
                    $vote_row = new VoteRow(); 
                    $vote_row->exists = true;
                    $vote_row->id = $index + 1;
                    
                    if($votes->votes == 0)
                        $votes_row->total_vote_add = 0;
                    else 
                        $vote_row->total_vote_add = $vote_rows[$index]->votes - $vote_rows[$index-1]->votes;


                    if($votes->bidenj == 0)
                        $vote_row->biden_votes = 0;

                    $vote_row->biden_votes = $votes->bidenj * $votes->votes;
                    
                    if($votes->trumpd == 0)
                        $vote_row->trump_votes = 0;
                    $vote_row->trump_votes = $votes->trumpd * $votes->votes;

                    $vote_row->other_votes = $votes->votes - $votes->biden_votes - $votes->trump_votes;

                    $vote_row->total_vote_add_trump = $votes->votes * $votes->trumpd - $vote_rows[$index-1]->votes * $vote_rows[$index-1]->trumpd;
                    $vote_row->total_vote_add_biden = $votes->votes * $votes->bidenj - $vote_rows[$index-1]->votes * $vote_rows[$index-1]->bidenj;
                    $vote_row->total_vote_add_other = (1 - $votes->bidenj - $votes->trumpd) * $votes->votes - $vote_rows[$index-1]->votes*(1 - $vote_rows[$index-1]->bidenj - $vote_rows[$index-1]->trumpd);
                    $vote_row->total_vote_add_total = $vote_rows[$index]->votes - $vote_rows[$index-1]->votes;
                    $vote_row->save();
                   
                }
                $index++; 
            };

            
            $vote_rows = VoteRow::all();
            //echo json_encode($vote_rows);

            $totalnum_votes = $vote_rows[count($vote_rows) - 1]->votes;
            //echo json_encode($totalnum_votes);

            $index = 0;
            foreach($vote_rows as $vote){
                $vote_row = new VoteRow(); 
                $vote_row->exists = true;
                $vote_row->id = $index + 1;
                if(($totalnum_votes - $vote->votes) != 0) {
                    $vote_row->percent_of_remaining_trump = ($vote->total_vote_add_trump * 100)/($totalnum_votes - $vote->votes);
                    $vote_row->percent_of_remaining_biden = ($vote->total_vote_add_biden * 100)/($totalnum_votes - $vote->votes);
                    $vote_row->save();
                }
               $index++;
            }

            $vote_rows = VoteRow::all();
            return $vote_rows;
        }
    }
}
