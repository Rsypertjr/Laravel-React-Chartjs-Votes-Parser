<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVoteRowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vote_rows', function (Blueprint $table) {
            $table->id();
            $table->integer('votes');
            $table->timestamp('timestamp');
            $table->float('bidenj');
            $table->integer('biden_votes');
            $table->float('trumpd');
            $table->integer('trump_votes');
            $table->integer('other_votes');
            $table->integer('total_vote_add');
            $table->double('total_vote_add_trump',15,8);
            $table->double('total_vote_add_biden',15,8);
            $table->double('total_vote_add_other',15,8);
            $table->double('total_vote_add_total',15,8);
            $table->float('percent_of_remaining_trump');
            $table->float('percent_of_remaining_biden');
            $table->timestamp('time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vote_rows');
    }
}
