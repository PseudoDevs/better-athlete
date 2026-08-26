<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('athlete_profiles', function (Blueprint $table) {
            $table->string('verification_status')->default('unverified')->after('current_goal');
            $table->timestamp('verified_at')->nullable()->after('verification_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('athlete_profiles', function (Blueprint $table) {
            $table->dropColumn(['verification_status', 'verified_at']);
        });
    }
};
